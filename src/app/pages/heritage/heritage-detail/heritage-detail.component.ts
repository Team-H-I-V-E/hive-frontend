import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GetHeritagesByIdResponseData } from "src/app/models/heritage/heritage-getheritagesbyid-response-data.interface";
import { HeritageService } from "src/app/services/heritage/heritage.service";
import { environment } from "src/environment/environment";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

declare var kakao: any;

@Component({
  selector: "app-heritage-detail",
  templateUrl: "./heritage-detail.component.html",
  styleUrls: ["./heritage-detail.component.scss"],
  standalone: false
})
export class HeritageDetailComponent implements OnInit, AfterViewInit {
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
    this.initThreeJS();
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

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 1, 3);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    this.scene.add(light);

    this.animate();
  }

  loadModel(url: string) {
    const loader = new GLTFLoader();

    // 🔥 URL을 콘솔로 출력해보기
    const absoluteUrl = url.startsWith("http") ? url : `http://localhost:3000${url}`;
    console.log("📌 GLB 요청 URL:", absoluteUrl);

    // 🔥 Fetch로 파일 요청 테스트
    fetch(absoluteUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.blob();
      })
      .then(blob => console.log("✅ Fetch 성공, 파일 크기:", blob.size))
      .catch(error => console.error("❌ Fetch 실패:", error));

    // 🔥 Three.js GLTFLoader로 모델 로드
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
    this.renderer.render(this.scene, this.camera);
  }

  goToHeritageList() {
    this.router.navigate([`/heritage/heritageList`]);
  }
}
