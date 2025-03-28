import { Component, OnInit } from '@angular/core';
import { GetPanoramaByIdResponseData } from 'src/app/models/panorama/panorama-getpanoramabyid-response-data.interface';
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

  selectedPanorama: GetPanoramaByIdResponseData | null = null;

  getImageUrl(): string {
    return environment.apiBaseUrl + this.selectedPanorama?.Panorama_panoramaImage;
  }

  closeSidebar(): void {
    this.selectedPanorama = null;

    // 사이드바 닫을 때 지도 다시 맞춤
    setTimeout(() => {
      this.map?.relayout();
    }, 0);
  }

  markersData: {
    panoramaId: number;
    latitude: number;
    longitude: number;
  }[] = [];

  private map: any;

  constructor(private panoramaService: PanoramaService) {}

  ngOnInit(): void {
    this.loadPanoramaLocations();
  }

  // 1. 데이터 로드 후 평균 좌표로 지도 초기화
  loadPanoramaLocations() {
    this.panoramaService.getPanorama().subscribe((data) => {
      if (!data || data.length === 0) {
        console.warn('받아온 파노라마 데이터가 없습니다.');
        return;
      }

      this.markersData = data.map(item => ({
        panoramaId: item.Panorama_panoramaId,
        latitude: Number(item.Panorama_panoramaLatitude),
        longitude: Number(item.Panorama_panoramaLongitude),
      }));

      console.log('마커 데이터:', this.markersData);

      const center = this.getAverageCoordinate(this.markersData);
      this.loadKakaoMap(center.latitude, center.longitude);
    });
  }

  // 2. 평균 좌표 계산
  getAverageCoordinate(data: { latitude: number; longitude: number }[]): { latitude: number; longitude: number } {
    const latSum = data.reduce((sum, d) => sum + d.latitude, 0);
    const lngSum = data.reduce((sum, d) => sum + d.longitude, 0);
    const count = data.length;

    return {
      latitude: latSum / count,
      longitude: lngSum / count,
    };
  }

  // 3. 카카오맵 로딩 처리
  loadKakaoMap(latitude: number, longitude: number) {
    if (typeof kakao === "undefined" || !kakao.maps) {
      this.loadKakaoScript()
        .then(() => {
          kakao.maps.load(() => this.initMap(latitude, longitude));
        })
        .catch((error) => {
          console.error("카카오 지도 스크립트 로드 실패:", error);
        });
    } else {
      kakao.maps.load(() => this.initMap(latitude, longitude));
    }
  }

  // 4. 카카오맵 스크립트 로딩
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

  // 5. 지도 초기화 및 마커 표시
  initMap(latitude: number, longitude: number) {
    const container = document.getElementById("map");
    if (!container) {
      console.error('지도를 그릴 #map 요소를 찾을 수 없습니다.');
      return;
    }

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 6, // 세종시 전체를 볼 수 있도록 적당히 확대
    };

    this.map = new kakao.maps.Map(container, options);

    // 마커들 렌더링
    this.markersData.forEach(markerData => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(markerData.latitude, markerData.longitude),
        map: this.map,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        this.panoramaService.getpanoramaById(markerData.panoramaId).subscribe({
          next: (data) => {
            this.selectedPanorama = data;
            console.log("선택된 파노라마 정보:", data);

            // 사이드바가 열렸을 때 지도 재조정
            setTimeout(() => {
              this.map?.relayout();
            }, 0);
          },
          error: (err) => {
            console.error("파노라마 상세 정보 요청 실패:", err);
          }
        });
      });
    });
  }
}
