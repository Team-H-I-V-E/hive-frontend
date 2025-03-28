import { Component, OnInit } from '@angular/core';
import { PanoramaService } from 'src/app/services/panorama/panorama.service';
import { GetPanoramaResponseData } from 'src/app/models/panorama/panorama-getpanorama-response-data.interface';
import { GetPanoramaByIdResponseData } from 'src/app/models/panorama/panorama-getpanoramabyid-response-data.interface';
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
  currentMarkers: any[] = [];
  allPanoramaData: GetPanoramaResponseData[] = [];

  markersData: {
    panoramaId: number;
    ruinsAge: string;
    latitude: number;
    longitude: number;
  }[] = [];

  eras: string[] = ['고조선', '백제', '신라', '고구려', '고려', '조선', '현대'];
  selectedEra: string = '';

  private map: any;

  constructor(private panoramaService: PanoramaService) {}

  ngOnInit(): void {
    this.loadPanoramaLocations();
  }

  getImageUrl(): string {
    return environment.apiBaseUrl + this.selectedPanorama?.Panorama_panoramaImage;
  }

  closeSidebar(): void {
    this.selectedPanorama = null;

    const panoDiv = document.getElementById('pano_div');
    if (panoDiv) panoDiv.innerHTML = '';

    setTimeout(() => {
      this.map?.relayout();
    }, 0);
  }

  selectEra(era: string): void {
    this.selectedEra = era;
    this.applyFilters();
  }

  applyFilters(): void {
    if (this.allPanoramaData.length === 0) {
      console.warn('⛔ 데이터가 아직 로드되지 않았습니다.');
      return;
    }

    const filtered = this.selectedEra
      ? this.allPanoramaData.filter(p => p.Panorama_ruinsAge?.trim() === this.selectedEra.trim())
      : this.allPanoramaData;

    this.markersData = filtered.map(item => ({
      panoramaId: item.Panorama_panoramaId,
      ruinsAge: item.Panorama_ruinsAge,
      latitude: Number(item.Panorama_panoramaLatitude),
      longitude: Number(item.Panorama_panoramaLongitude),
    }));

    if (!this.map) {
      // 최초 지도 생성
      const center = this.getAverageCoordinate(this.markersData);
      this.loadKakaoMap(center.latitude, center.longitude);
    } else {
      // 지도 유지한 채 마커만 다시 그림
      this.renderMarkers();
    }
  }

  loadPanoramaLocations(): void {
    this.panoramaService.getPanorama().subscribe((data) => {
      if (!data || data.length === 0) {
        console.warn('받아온 파노라마 데이터가 없습니다.');
        return;
      }

      this.allPanoramaData = data;

      this.markersData = data.map(item => ({
        panoramaId: item.Panorama_panoramaId,
        ruinsAge: item.Panorama_ruinsAge,
        latitude: Number(item.Panorama_panoramaLatitude),
        longitude: Number(item.Panorama_panoramaLongitude),
      }));

      const center = this.getAverageCoordinate(this.markersData);
      this.loadKakaoMap(center.latitude, center.longitude);
    });
  }

  getAverageCoordinate(data: { latitude: number; longitude: number }[]): { latitude: number; longitude: number } {
    const latSum = data.reduce((sum, d) => sum + d.latitude, 0);
    const lngSum = data.reduce((sum, d) => sum + d.longitude, 0);
    const count = data.length;

    return {
      latitude: latSum / count,
      longitude: lngSum / count,
    };
  }

  loadKakaoMap(latitude: number, longitude: number): void {
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

  initMap(latitude: number, longitude: number): void {
    const container = document.getElementById("map");
    if (!container) {
      console.error('지도를 그릴 #map 요소를 찾을 수 없습니다.');
      return;
    }

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 6,
    };

    this.map = new kakao.maps.Map(container, options);
    this.renderMarkers(); // ✅ 초기 마커 렌더링
  }

  renderMarkers(): void {
    // 기존 마커 제거
    this.currentMarkers.forEach(marker => marker.setMap(null));
    this.currentMarkers = [];

    this.markersData.forEach(markerData => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(markerData.latitude, markerData.longitude),
        map: this.map,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        this.panoramaService.getpanoramaById(markerData.panoramaId).subscribe({
          next: (data) => {
            this.selectedPanorama = data;
            setTimeout(() => this.map?.relayout(), 0);
          },
          error: (err) => console.error("파노라마 상세 정보 요청 실패:", err),
        });
      });

      this.currentMarkers.push(marker);
    });
  }
}
