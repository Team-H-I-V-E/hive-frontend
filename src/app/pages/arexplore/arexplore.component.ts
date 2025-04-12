import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-arexplore',
  templateUrl: 'arexplore.component.html',
  styleUrls: ['arexplore.component.scss'],
  standalone: false,
})
export class ARExploreComponent implements OnInit {
  private baseUrl = `${environment.apiBaseUrl}/api/arexperience`;

  userLatitude: number | null = null;
  userLongitude: number | null = null;
  stamps: any[] = [];
  userId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;

        this.loadStamps(); // 위치 얻은 뒤 스탬프 불러오기
      });
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }

  loadStamps() {
    this.http.get<any[]>(`${this.baseUrl}/${this.userId}/unacquired-stamps`)
      .subscribe(stamps => {
        this.stamps = stamps;

        // 위치 비교해서 획득 조건 충족되면 획득 시도
        this.stamps.forEach(stamp => {
          const distance = this.calculateDistance(
            this.userLatitude!,
            this.userLongitude!,
            stamp.stampLatitude,
            stamp.stampLongitude
          );

          if (distance <= 20) {
            this.acquireStamp(stamp.stampID);
          }
        });
      });
  }

  acquireStamp(stampId: number) {
    this.http.post(`${this.baseUrl}/${this.userId}/${stampId}`, {
      userLatitude: this.userLatitude,
      userLongitude: this.userLongitude
    }).subscribe({
      next: (res) => console.log('획득 성공:', res),
      error: (err) => console.error('획득 실패:', err)
    });
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (val: number) => val * Math.PI / 180;
    const R = 6371e3;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}