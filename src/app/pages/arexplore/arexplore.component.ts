import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stamp } from 'src/app/models/arexplore/stamp.model';

@Component({
  selector: 'app-arexplore',
  templateUrl: 'arexplore.component.html',
  styleUrls: ['arexplore.component.scss'],
  standalone: false,
})
export class ARExploreComponent implements OnInit, AfterViewInit {
  private readonly API_URL = '/api/arexplore'; // http://localhost:3000/api/arexperience와 같이 http://localhost:3000로 지정하면 안됨

  private lastUpdate: number = 0;
  private updateInterval: number = 60000; 
  userLatitude: number | null = null;
  userLongitude: number | null = null;
  previousLatitude: number | null = null;
  previousLongitude: number | null = null;

  stamps: Stamp[] = [];
  userId = 1;

  stampName: string = '';
  stampDescription: string = '';
  stampId: number = 0; 
  stampImg: string = '';
  showModal: boolean = false;

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
        const now = Date.now();

        // 위치 정보는 계속 갱신 (실시간으로 위치 추적 : 클라이언트)
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;

        console.log('📍 실시간 위치:', this.userLatitude, this.userLongitude);
        
        // 위치가 1km 이상 이동했을 때만 스탬프 목록 갱신
        if (this.previousLatitude !== null && this.previousLongitude !== null) {
          if (this.shouldLoadStamps()) {
            this.loadStamps(); // 1km 이상 이동한 경우
          }
        } 

        // 1분마다 위치 갱신 (갱신된 위치 전송 : 서버)
        if (now - this.lastUpdate > this.updateInterval) { 
          this.lastUpdate = now;

          // 스탬프 목록을 일정 시간마다 갱신
          this.loadStamps();
          
          // 현재 위치를 이전 위치로 업데이트
          this.previousLatitude = this.userLatitude;
          this.previousLongitude = this.userLongitude;
        }
      }, error => {
        console.error('❌ 위치 정보 가져오기 실패:', error);
      });
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }

  shouldLoadStamps(): boolean {
    if (this.previousLatitude !== null && this.previousLongitude !== null) {
      const distance = this.calculateDistance(
        this.previousLatitude,
        this.previousLongitude,
        this.userLatitude!,
        this.userLongitude!
      );
      console.log(`이동 거리: ${distance}m`);
      return distance >= 1000;
    }
    return false;
  }

  loadStamps() {
    console.log('📨 스탬프 불러오기 요청 보냄');
    this.http.get<Stamp[]>(`${this.API_URL}/${this.userId}/unacquired-stamps`)
      .subscribe({
        next: (stamps) => {
          this.stamps = stamps.filter(stamp => {
            if (this.userLatitude !== null && this.userLongitude !== null) {
              const distance = this.calculateDistance(
                this.userLatitude,
                this.userLongitude,
                stamp.stampLatitude,
                stamp.stampLongitude
              );
              
              console.log(`📏 스탬프 ${stamp.stampID}까지 거리: ${distance}m`);
              
              return distance <= 1000;
            }
            return false;
          });
          console.log('📦 불러온 1km 이내 스탬프 목록:', this.stamps);
        },
        error: (err) => {
          console.error('❌ 스탬프 불러오기 실패:', err);
        }
      });
  }
  
  onModelClick(stampId: number) {
    console.log(`스탬프 ${stampId}를 클릭했습니다.`);
    this.acquireStamp(stampId);
  }
  
  acquireStamp(stampId: number) {
    this.http.post(`${this.API_URL}/${this.userId}/${stampId}`, {
      userLatitude: this.userLatitude,
      userLongitude: this.userLongitude
    }).subscribe({
      next: (response: any) => {
        console.log(`스탬프 ${stampId} 획득 성공`);
        
        this.stampName = response.stampDetails.stampName;
        this.stampDescription = response.stampDetails.stampDescription;
        this.stampId = response.stampDetails.stampID;
        this.stampImg = response.stampDetails.stampImage;

        console.log('이미지 URL:', this.stampImg); 
        
        this.showModal = true;

        this.loadStamps();
      },
      error: (err) => {
        console.error(`스탬프 ${stampId} 획득 실패`, err);
      }
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
  closeModal() {
    this.showModal = false;
  }
}
