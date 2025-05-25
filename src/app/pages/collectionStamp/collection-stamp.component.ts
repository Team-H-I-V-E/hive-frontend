import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CollectionStampService } from '../../services/collectionStamp/collectionStamp.service';
import { StampList } from '../../models/collectionStamp/stamp-list.interface';
import { StampDetail } from '../../models/collectionStamp/stamp-detail.interface';
import { environment } from 'src/environment/environment';

declare var kakao: any;

@Component({
  selector: 'app-collection-stamp',
  templateUrl: './collection-stamp.component.html',
  styleUrls: ['./collection-stamp.component.scss'],
  standalone: false,
})
export class CollectionStampComponent implements OnInit, AfterViewChecked {
  stamps: StampList[] = [];
  detail: StampDetail | null = null;
  showDetail = false;

  private map: any;
  private mapInitialized = false;

  constructor(private svc: CollectionStampService) {}

  ngOnInit() {
    console.log('📨 내 스탬프 목록 요청');
    this.svc.getMyStamps().subscribe({
      next: data => {
        console.log('📦 받은 스탬프 목록:', data);
        this.stamps = data;
      },
      error: err => {
        console.error('❌ 스탬프 조회 실패:', err);
      }
    });
  }

  onImageClick(s: StampList) {
    console.log(`📨 스탬프 상세 조회 요청: stampID=${s.stampID}`);
    this.svc.getStampDetail(s.stampID).subscribe({
      next: d => {
        console.log('📦 받은 스탬프 상세:', d);
        this.detail = { ...d, stampImage: s.stampImage };
        this.showDetail = true;
        this.mapInitialized = false;
      },
      error: err => {
        console.error(`❌ 스탬프 상세 조회 실패 (stampID=${s.stampID}):`, err);
      }
    });
  }

  closeDetail() {
    this.showDetail = false;
    this.mapInitialized = false;
  }

  // 뷰가 렌더된 후에 지도를 초기화
  ngAfterViewChecked(): void {
    if (
      this.showDetail &&
      !this.mapInitialized &&
      this.detail?.stampLatitude &&
      this.detail?.stampLongitude
    ) {
      this.mapInitialized = true;
      setTimeout(() => {
        this.loadKakaoMap(this.detail!.stampLatitude, this.detail!.stampLongitude);
      }, 100);
    }
  }

  loadKakaoMap(latitude: number, longitude: number) {
      if (typeof kakao === "undefined" || !kakao.maps) {
      this.loadKakaoScript().then(() => {
        kakao.maps.load(() => {
          this.initMap(latitude, longitude);
        });
      });
    } else {
      kakao.maps.load(() => {
        this.initMap(latitude, longitude);
      });
    }
  }

  loadKakaoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById("kakao-map-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${environment.kakaoMapApiKey}&libraries=services&autoload=false`;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error("카카오 지도 SDK 로드 실패"));
      document.body.appendChild(script);
    });
  }

  initMap(latitude: number, longitude: number) {
    const container = document.getElementById("map");
    if (!container) return;

    container.innerHTML = '';
    container.style.width = '100%';
    container.style.height = '300px';

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
    });

    marker.setMap(map);

    // 강제 리사이즈
    setTimeout(() => {
      kakao.maps.event.trigger(map, 'resize');
      map.setCenter(new kakao.maps.LatLng(latitude, longitude));
    }, 200);
  }
}
