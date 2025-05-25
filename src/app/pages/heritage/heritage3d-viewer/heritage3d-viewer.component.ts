import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { HeritageService } from 'src/app/services/heritage/heritage.service';
import { GetHeritagesByIdResponseData } from 'src/app/models/heritage/heritage-getheritagesbyid-response-data.interface';

@Component({
  selector: 'app-heritage3d-viewer',
  templateUrl: './heritage3d-viewer.component.html',
  styleUrls: ['./heritage3d-viewer.component.scss'],
  standalone: false
})
export class Heritage3DViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  constructor(
    private route: ActivatedRoute,
    private heritageService: HeritageService
  ) {}

  ngOnInit(): void {
    const heritageId = this.route.snapshot.paramMap.get('id');
    if (heritageId) {
      this.loadHeritageAndModel(+heritageId);
    }
  }

  ngAfterViewInit(): void {
    // DOM이 준비된 후에만 init 실행
  }

  loadHeritageAndModel(heritageId: number) {
    this.heritageService.getHeritageById(heritageId).subscribe((data: GetHeritagesByIdResponseData) => {
      const modelUrl = data.heritage3DModel?.modelFileUrl;
      if (modelUrl) {
        const absoluteUrl = modelUrl.startsWith('http') ? modelUrl : `http://localhost:3000${modelUrl}`;
        this.initThreeJS();
        this.loadModel(absoluteUrl);
      } else {
        console.warn('모델 파일 URL이 없습니다!');
      }
    });
  }

  initThreeJS() {
  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0x333333); // 어두운 배경

  const container = this.canvasContainer.nativeElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  this.camera.position.set(0, 2, 5);
  this.camera.lookAt(0, 0, 0);

  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setSize(width, height);
  container.appendChild(this.renderer.domElement);

  // Directional Light: 모델 위에서 빛을 비추도록 설정
  const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  this.scene.add(directionalLight);

  // SpotLight: 모델에 스포트라이트처럼 집중되도록 설정
  const spotLight = new THREE.SpotLight(0xffffff, 5);
  spotLight.position.set(0, 5, 5);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.3;
  spotLight.decay = 2;
  spotLight.distance = 30;
  spotLight.castShadow = true;
  this.scene.add(spotLight);

  // PointLight: 모델 중심에서 부드럽게 퍼지는 조명
  const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
  pointLight.position.set(0, 1, 0);
  this.scene.add(pointLight);

  // Ambient Light: 낮은 밝기로 배경만 살짝 보이게
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  this.scene.add(ambientLight);

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
    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(5, 5, 5);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        this.scene.add(model);
        console.log('✅ GLB 모델 로드 성공');
      },
      undefined,
      (error) => {
        console.error('❌ GLB 모델 로드 실패:', error);
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
    }
  }
  init3DViewer(heritageId: string | null) {
    const scene = new THREE.Scene();
  
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
  
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    scene.add(light);
  
    const loader = new GLTFLoader();
    loader.load(`http://localhost:3000/models/${heritageId}.glb`, (gltf) => {
      const model = gltf.scene;
  
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
  
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = maxDim / (2 * Math.tan(fov / 2));
      camera.position.set(0, 0, cameraZ * 1.5);
      camera.lookAt(0, 0, 0);
  
      scene.add(model);
      animate();
    });
  
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }
}
