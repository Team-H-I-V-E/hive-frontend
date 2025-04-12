import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, model } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GetHeritagesByIdResponseData } from "src/app/models/heritage/heritage-getheritagesbyid-response-data.interface";
import { HeritageService } from "src/app/services/heritage/heritage.service";
import { environment } from "src/environment/environment";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

declare var kakao: any;

@Component({
  selector: "app-heritage-detail",
  templateUrl: "./heritage-detail.component.html",
  styleUrls: ["./heritage-detail.component.scss"],
  standalone: false
})
export class HeritageDetailComponent implements OnInit, AfterViewInit {
  show3DModel = false; 
  @ViewChild("rendererContainer", { static: false }) rendererContainer!: ElementRef;
  heritage: GetHeritagesByIdResponseData = {
    heritageId: 0,
    heritageName: '',
    heritageDescription: '',
    heritageLocation: '',
    heritageLatitude: 0,
    heritageLongitude: 0,
    heritage3DModel: {
      heritage3dModelId: 0,
      modelFileUrl: ''
    },
  };

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heritageService: HeritageService,
  ) { }

  ngOnInit() {
    const heritageId = this.route.snapshot.paramMap.get("id");
    if (heritageId) {
      this.loadHeritageDetail(+heritageId);
    }
  }

  ngAfterViewInit() {
    console.log("컨테이너 DOM:", this.rendererContainer.nativeElement);
    const container = this.rendererContainer.nativeElement;
    console.log("사이즈:", container.offsetWidth, container.offsetHeight); 
  
  }
  
  loadHeritageDetail(heritageId: number) {
    this.heritageService.getHeritageById(heritageId).subscribe((data) => {
      console.log("데이터:", data); // 데이터 확인

      if (!data) return;

      this.heritage = data;
      this.loadKakaoMap(data.heritageLatitude, data.heritageLongitude);

      const modelUrl = this.heritage.heritage3DModel?.modelFileUrl;

      if (modelUrl) {
        console.log("모델 파일 URL 확인:", modelUrl);
        this.loadModel(modelUrl);
      } else {
        console.warn("모델 파일 URL이 없습니다!");
      }
    });
  }

  loadKakaoMap(latitude: number, longitude: number) {
    if (typeof kakao === "undefined" || !kakao.maps) {
      this.loadKakaoScript().then(() => {
        kakao.maps.load(() => {
          this.initMap(latitude, longitude);
        });
      });
    } else {
      kakao.maps.load(() => {
        this.initMap(latitude, longitude);
      });
    }
  }

  loadKakaoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById("kakao-map-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${environment.kakaoMapApiKey}&libraries=services&autoload=false`;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error("카카오 지도 SDK 로드 실패"));
      document.body.appendChild(script);
    });
  }

  initMap(latitude: number, longitude: number) {
    const container = document.getElementById("map");
    if (!container) return;

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
    });
    marker.setMap(map);
  }

  initThreeJS() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);
  
    const container = this.rendererContainer.nativeElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
  
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 2, 5);
    this.camera.lookAt(0, 0, 0);
  
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height); // width, height 꼭 지정
    container.appendChild(this.renderer.domElement);
  
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.rotateSpeed = 0.5;
    this.controls.zoomSpeed = 0.5;
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 100;
  
    this.animate();
  }
  
  

  loadModel(url: string) {
    const loader = new GLTFLoader();
    const absoluteUrl = url.startsWith("http") ? url : `http://localhost:3000${url}`;
    console.log("GLB 요청 URL:", absoluteUrl);

    // Fetch로 파일 요청 테스트
    fetch(absoluteUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.blob();
      })
      .then(blob => console.log("✅ Fetch 성공, 파일 크기:", blob.size))
      .catch(error => console.error("❌ Fetch 실패:", error));

    // Three.js GLTFLoader로 모델 로드
    loader.load(
      absoluteUrl,
      (gltf) => {
        this.scene.add(gltf.scene);
        console.log("✅ GLB 모델 로드 성공");
      },
      undefined,
      (error) => {
        console.error("❌ GLB 모델 로드 실패:", error);
      }
    );
  }

  animate() {
    requestAnimationFrame(() => this.animate());
  
    if (this.controls) {
      this.controls.update();
    }
  
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    } else {
      console.warn("렌더 요소가 준비되지 않았습니다");
    }
  }
  
  goToHeritageList() {
    this.router.navigate([`/heritage/heritageList`]);
  }

  view3DModel() {
    console.log("3D View 클릭됨!");
    this.show3DModel = true;
  
    // 0ms보다 조금 더 여유 있는 타이밍으로 DOM이 확실히 생성된 후 실행
    setTimeout(() => {
      // 컨테이너가 완전히 DOM에 올라왔는지 확인
      if (!this.rendererContainer?.nativeElement) {
        console.error("rendererContainer가 아직 DOM에 없습니다!");
        return;
      }
      
      const container = this.rendererContainer.nativeElement;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      console.log("렌더링 div 사이즈 확인:", w, h);
  
      if (w === 0 || h === 0) {
        console.warn("렌더링 컨테이너 크기가 0입니다! CSS를 확인하세요.");
      }
  
      this.initThreeJS();
  
      const modelUrl = this.heritage.heritage3DModel?.modelFileUrl;
      if (modelUrl) {
        const absoluteUrl = modelUrl.startsWith("http") ? modelUrl : `http://localhost:3000${modelUrl}`;
        this.loadModel(absoluteUrl);
      }
    }, 100);
  }
  
  
  
  
}
