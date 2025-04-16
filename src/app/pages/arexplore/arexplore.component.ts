import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-arexplore',
  templateUrl: 'arexplore.component.html',
  styleUrls: ['arexplore.component.scss'],
  standalone: false,
})
export class ARExploreComponent implements OnInit, AfterViewInit {
  private baseUrl = `${environment.apiBaseUrl}/api/arexperience`;

  userLatitude: number | null = null;
  userLongitude: number | null = null;
  stamps: any[] = [];
  userId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.stamps = [
      {
        stampID: 9,
        stampImage: 'http://example.com/image9.png',
        stampLatitude: 37.621059,
        stampLongitude: 127.058259
      }
    ]
    // this.getUserLocation();

    this.userLatitude = 37.621059;
    this.userLongitude = 127.058259;

    this.stamps.forEach(stamp => {
      const distance = this.calculateDistance(
        this.userLatitude!,
        this.userLongitude!,
        stamp.stampLatitude,
        stamp.stampLongitude
      );

      console.log(`📏 스탬프 ${stamp.stampID}까지 거리: ${distance}m`);
    });
  }

  ngAfterViewInit() {
    // 렌더링 후 AR.js가 요소를 인식할 수 있도록 1초 대기
    setTimeout(() => {
      console.log('✅ AR.js가 요소를 인식할 수 있음');
    }, 1000);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;

        // 현재 위치 콘솔 출력
        console.log('📍 현재 위치:', this.userLatitude, this.userLongitude);

        this.loadStamps(); // 위치 얻은 뒤 스탬프 불러오기
      }, error => {
        console.error('❌ 위치 정보 가져오기 실패:', error);
      });
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }

  loadStamps() {
    this.http.get<any[]>(`${this.baseUrl}/${this.userId}/unacquired-stamps`)
      .subscribe(stamps => {
        this.stamps = stamps;
        console.log('📦 불러온 스탬프 목록:', this.stamps);

        this.stamps.forEach(stamp => {
          const distance = this.calculateDistance(
            this.userLatitude!,
            this.userLongitude!,
            stamp.stampLatitude,
            stamp.stampLongitude
          );

          console.log(`📏 스탬프 ${stamp.stampID}까지 거리: ${distance}m`);

          if (distance <= 1000) {
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
      next: (res) => alert(res),
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
