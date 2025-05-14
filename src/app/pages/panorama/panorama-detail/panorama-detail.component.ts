import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnInit } from '@angular/core';

declare const pannellum: any;

@Component({
  selector: 'app-panorama-detail',
  templateUrl: './panorama-detail.component.html',
  styleUrls: ['./panorama-detail.component.scss'],
  standalone: false,
})

export class PanoramaDetailComponent implements OnChanges, AfterViewInit {
  @Input() panorama: any;
  @Output() close = new EventEmitter<void>();
  viewerActive = false;
  currentImageUrl: string = '';
  selectedPointId: number | null = null;

  ngAfterViewInit(): void {
    this.initPreviewViewer();
  }

  ngOnChanges(): void {
    this.initPreviewViewer();
  }

  onClose(): void {
    this.close.emit();
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
    this.viewerActive = true;

    const image = this.panorama?.panoramaImages?.[0];
    if (!image) return;

    const initialPoint = this.panorama?.miniMapPoints?.find(
      (point: any) => point.targetPanoramaImage?.imageUrl === image.imageUrl
    );

    this.selectedPointId = initialPoint?.id ?? null;

    setTimeout(() => {
      const viewer = pannellum.viewer('pano_div_0', {
        type: 'equirectangular',
        panorama: 'http://localhost:3000/' + image.imageUrl,
        autoLoad: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
      });

      viewer.on('fullscreentoggle', () => {
        const miniMapEl = document.getElementById('minimap');
        if (!miniMapEl) return;

        const isFullscreen = document.fullscreenElement !== null;

        if (isFullscreen) {
          miniMapEl.style.position = 'fixed';
          miniMapEl.style.bottom = '16px';
          miniMapEl.style.right = '16px';
          miniMapEl.style.zIndex = '9999';
          document.body.appendChild(miniMapEl);
        } else {
          const container = document.querySelector('.position-relative.w-100.h-100');
          if (container) container.appendChild(miniMapEl);
          miniMapEl.style.position = 'absolute';
          miniMapEl.style.bottom = '';
          miniMapEl.style.right = '';
          miniMapEl.style.zIndex = '';
        }
      });
    }, 0);
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
}