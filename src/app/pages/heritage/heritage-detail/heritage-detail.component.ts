import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeritageService } from 'src/app/services/heritage/heritage.service';
import { GetHeritagesByIdResponseData } from 'src/app/models/heritage/heritage-getheritagesbyid-response-data.interface';

declare var kakao: any;

@Component({
  selector: 'app-heritage-detail',
  templateUrl: './heritage-detail.component.html',
  styleUrls: ['./heritage-detail.component.scss'],
  standalone: false
})
export class HeritageDetailComponent implements OnInit {
  heritage: GetHeritagesByIdResponseData | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heritageService: HeritageService
  ) {}

  ngOnInit() {
    const heritageId = this.route.snapshot.paramMap.get('id');
    if (heritageId) {
      this.loadHeritageDetail(+heritageId);
    }
  }

  loadHeritageDetail(id: number) {
    this.heritageService.getHeritageById(id).subscribe((data: GetHeritagesByIdResponseData) => {
      if (data) {
        this.heritage = data;
        this.loadMap(data.heritageLatitude, data.heritageLongitude);
      }
    });
  }

  loadMap(latitude: number, longitude: number) {
    const container = document.getElementById('map');
    if (!container) return; // 요소가 없으면 종료

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
  
  goToHeritageList() {
    this.router.navigate(['/heritage/heritageList']);
  }
}
