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
    const backendUrl = 'http://localhost:3000/';
  
    if (this.panorama?.panoramaImages?.length) {
      this.panorama.panoramaImages.forEach((image: any, index: number) => {
        const panoDivId = `pano_div_${index}`;
        const panoDiv = document.getElementById(panoDivId);
  
        if (panoDiv) {
          panoDiv.innerHTML = '';
          setTimeout(() => {
            pannellum.viewer(panoDivId, {
              type: 'equirectangular',
              panorama: encodeURI(backendUrl + image.panoramaImage),
              autoLoad: true,
            });
          }, 0);
        }
      });
    }
  }  

  onClose(): void {
    this.close.emit(); // 부모에게 닫기 이벤트 전달
  }
}