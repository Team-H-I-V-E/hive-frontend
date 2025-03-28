import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
  
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
  
    ngAfterViewInit(): void {
      this.loadPanorama();
    }
  
    ngOnChanges(): void {
      this.loadPanorama();
    }
  
    loadPanorama(): void {
      if (this.panorama?.Panorama_panoramaImage) {
        pannellum.viewer('pano_div', {
          type: 'equirectangular',
          panorama: this.panorama.Panorama_panoramaImage,
          autoLoad: true,
        });
      }
    }
  
    onClose(): void {
      this.close.emit(); // 부모에게 닫기 이벤트 전달
    }
  }
  