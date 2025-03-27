import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanoramaService } from 'src/app/services/panorama/panorama.service';
import { environment } from "src/environment/environment";

declare var kakao: any;

@Component({
  selector: 'app-panorama',
  templateUrl: 'panorama.component.html',
  styleUrls: ['panorama.component.scss'],
  standalone: false,
})
export class PanoramaComponent implements OnInit {
  panorama = {
    panoramaId: 0,
    ruinsName: '',
    ruinsAge: '',
    ruinsLocation: '',
    ruinsInformation: '',
    panoramaImage: '',
    panoramaLatitude: 0,
    panoramaLongitude: 0,
  };

  markersData: { panoramaId: number; latitude: number; longitude: number }[] = [];
  private map: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private panoramaService: PanoramaService
  ) {}

  ngOnInit() {
    this.loadPanoramaLocations();
  }

  loadPanoramaLocations() {
    this.panoramaService.getPanorama().subscribe((data) => {
      if (!data || data.length === 0) {
        console.warn('받아온 파노라마 데이터가 없습니다.');
        return;
      }

      this.markersData = data.map(item => ({
        panoramaId: item.panoramaId,
        latitude: Number(item.panoramaLatitude),
        longitude: Number(item.panoramaLongitude),
      }));

      console.log('마커 데이터:', this.markersData);

      // 첫 번째 마커 기준으로 지도 초기화
      if (this.markersData.length > 0) {
        this.loadKakaoMap(this.markersData[0].latitude, this.markersData[0].longitude);
      }
    });
  }

  loadKakaoMap(latitude: number, longitude: number) {
    if (typeof kakao === "undefined" || !kakao.maps) {
      this.loadKakaoScript().then(() => {
        kakao.maps.load(() => {
          this.initMap(latitude, longitude);
        });
      }).catch((error) => {
        console.error("카카오 지도 스크립트 로드 실패:", error);
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
    if (!container) {
      console.error('지도를 그릴 #map 요소를 찾을 수 없습니다.');
      return;
    }

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    this.map = new kakao.maps.Map(container, options);

    // 중심 마커
    const centerMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
      map: this.map,
    });

    // 모든 마커 렌더링
    this.markersData.forEach(markerData => {
      const markerPosition = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(this.map);

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">ID: ${markerData.panoramaId}</div>`,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(this.map, marker);
      });
    });
  }
}
