import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanoramaViewer, PanoramaViewerService } from 'src/app/services/panorama/panorama.service';

@Component({
  selector: 'app-panorama',
  templateUrl: 'panorama.component.html',
  styleUrls: ['panorama.component.scss'],
  standalone: false,
})
export class PanoramaComponent implements OnInit {
  panoramaViewers: PanoramaViewer[] = [];

  constructor(private panoramaViewerService: PanoramaViewerService, private router: Router) {}

  async ngOnInit() {
    try {
      const response = await this.panoramaViewerService.getAllPanoramaViewers();
      if (response.success) {
        this.panoramaViewers = response.data;
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Fetch error : ', error);
    }
  }

  getPanoramaViewerDetail(panoramaViewerID: number) {
    this.router.navigate([`detail/${panoramaViewerID}`]);
  }

}