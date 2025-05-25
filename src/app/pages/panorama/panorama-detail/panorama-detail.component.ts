import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PanoramaService } from 'src/app/services/panorama/panorama.service';
import { NotFoundError } from 'rxjs';

declare const pannellum: any;

@Component({
  selector: 'app-panorama-detail',
  templateUrl: './panorama-detail.component.html',
  styleUrls: ['./panorama-detail.component.scss'],
  standalone: false,
})
export class PanoramaDetailComponent implements OnChanges, AfterViewInit {
  @Input() panorama: any;
  @Input() userId!: number; // 부모 컴포넌트에서 전달받기
  @Output() close = new EventEmitter<void>();

  viewerActive = false;
  currentImageUrl: string = '';
  selectedPointId: number | null = null;
  isFavorite = false;
  isExpanded = false;

  constructor(private panoramaService: PanoramaService) { }

  ngAfterViewInit(): void {
    this.initPreviewViewer();
  }

  ngOnChanges(): void {
    this.initPreviewViewer();
    this.checkIfFavorite(); // 파노라마 바뀔 때마다 즐겨찾기 여부 확인
  }

  onClose(): void {
    this.close.emit();
  }

  checkIfFavorite(): void {
    if (!this.userId || !this.panorama?.panoramaId) return;

    this.panoramaService.getFavorites(this.userId).subscribe({
      next: (favorites) => {
        this.isFavorite = favorites.some(fav => fav.panoramaId === this.panorama.panoramaId);
      },
      error: (err: HttpErrorResponse) => {
        console.error('즐겨찾기 확인 실패', err);
        this.isFavorite = false;
      },
    });
  }

  toggleFavorite(): void {
    if (!this.userId || !this.panorama?.panoramaId) return;

    if (this.isFavorite) {
      // 즐겨찾기 삭제
      this.panoramaService.deleteFavorite(this.userId, this.panorama.panoramaId).subscribe({
        next: () => {
          this.isFavorite = false;
        },
        error: (err) => {
          console.error('즐겨찾기 삭제 실패', err);
        },
      });
    } else {
      // 즐겨찾기 추가
      this.panoramaService.addFavorite(this.userId, this.panorama.panoramaId).subscribe({
        next: () => {
          this.isFavorite = true;
        },
        error: (err) => {
          console.error('즐겨찾기 추가 실패', err);
        },
      });
    }
  }

  initPreviewViewer(): void {
    const image = this.panorama?.panoramaImages?.[0];
    if (!image) return;

    const previewDiv = document.getElementById('pano_preview');
    if (previewDiv) {
      previewDiv.innerHTML = '';

      setTimeout(() => {
        pannellum.viewer('pano_preview', {
          type: 'equirectangular',
          panorama: 'http://localhost:3000/' + image.imageUrl,
          autoLoad: true,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          compass: false,
          showControls: false,
          disableKeyboardCtrl: true,
          mouseZoom: false,
        });
      }, 0);
    }
  }

  activateViewer(): void {
    this.viewerActive = true; // 뷰어 활성 상태로 변경

    const image = this.panorama?.panoramaImages?.[0]; // 첫 번째 파노라마 이미지 가져오기
    if (!image) return; // 이미지가 없으면 함수 종료

    // 현재 이미지와 연결된 미니맵 포인트 찾기
    const initialPoint = this.panorama?.miniMapPoints?.find(
      (point: any) => point.targetPanoramaImage?.imageUrl === image.imageUrl
    );

    this.selectedPointId = initialPoint?.id ?? null; // 선택된 포인트 ID 설정

    // 뷰어 초기화 (렌더링 이후 실행 보장)
    setTimeout(() => {
      const viewer = pannellum.viewer('pano_div_0', {
        type: 'equirectangular', // 파노라마 타입
        panorama: 'http://localhost:3000/' + image.imageUrl, // 이미지 경로 설정
        autoLoad: true,           // 자동 로드
        showZoomCtrl: true,       // 확대/축소 버튼 표시
        showFullscreenCtrl: true, // 전체화면 버튼 표시
      });
    });
  }

  moveToPanorama(point: any): void {
    const targetImage = point.targetPanoramaImage;
    if (!targetImage || !targetImage.imageUrl) return;

    this.selectedPointId = point.id;  // ← 선택된 포인트 ID 저장

    const panoDiv = document.getElementById('pano_div_0');
    if (panoDiv) {
      panoDiv.innerHTML = '';
      pannellum.viewer('pano_div_0', {
        type: 'equirectangular',
        panorama: 'http://localhost:3000/' + targetImage.imageUrl,
        autoLoad: true,
      });
    }
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }
}