import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Stamp } from 'src/app/models/arexplore/stamp.model';

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
  stamps: Stamp[] = [];
  userId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.getUserLocation();
    console.log('🚀 컴포넌트 초기화됨');
  }

  ngAfterViewInit() {
    // 렌더링 후 AR.js가 요소를 인식할 수 있도록 1초 대기
    setTimeout(() => {
      console.log('✅ AR.js가 요소를 인식할 수 있음');
    }, 1000);
  }

  getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
      this.userLatitude = position.coords.latitude;
      this.userLongitude = position.coords.longitude;

      console.log('📍 실시간 위치:', this.userLatitude, this.userLongitude);

      this.loadStamps();

    }, error => {
      console.error('❌ 위치 정보 가져오기 실패:', error);
    });
  } else {
    alert("브라우저가 위치 정보를 지원하지 않습니다.");
  }
}


loadStamps() {
  console.log('📨 스탬프 불러오기 요청 보냄');
  this.http.get<Stamp[]>(`${this.baseUrl}/${this.userId}/unacquired-stamps`)
    .subscribe({
      next: (stamps) => {
        this.stamps = stamps;
        console.log('📦 불러온 스탬프 목록:', this.stamps);

        this.stamps.forEach(stamp => {
          if (this.userLatitude !== null && this.userLongitude !== null) {
            const distance = this.calculateDistance(
              this.userLatitude,
              this.userLongitude,
              stamp.stampLatitude,
              stamp.stampLongitude
            );
        
            console.log(`📏 스탬프 ${stamp.stampID}까지 거리: ${distance}m`);
        
            if (distance <= 1000) {
              console.log(`⏳ 스탬프 ${stamp.stampID}는 2분 뒤에 획득 처리 예정`);
              setTimeout(() => {
                this.acquireStamp(stamp.stampID);
              }, 120000); // 120,000ms = 2분
            }
          } else {
            console.warn(`📌 위치 정보가 아직 없음 → 스탬프 ${stamp.stampID}는 거리 계산 생략`);
          }
        });
      },
      error: (err) => {
        console.error('❌ 스탬프 불러오기 실패:', err);
      }
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
