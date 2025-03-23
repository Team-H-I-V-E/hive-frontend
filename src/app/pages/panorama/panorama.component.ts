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

  markersData = [
    { name: "장소 1", latitude: 37.5665, longitude: 126.9780 },
    { name: "장소 2", latitude: 37.5651, longitude: 126.9896 },
    { name: "장소 3", latitude: 37.5702, longitude: 126.9823 }
  ]; // 예제 데이터, 실제 데이터로 변경 가능

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private panoramaService: PanoramaService
  ) { }

  ngOnInit() {
    const panoramaId = this.route.snapshot.paramMap.get("id");
    if (panoramaId) {
      this.loadPanoramaDetail(+panoramaId);
    } else {
      this.loadUserLocation(); // 데이터가 없으면 현재 위치 기반 지도 로드
    }
  }

  loadPanoramaDetail(id: number) {
    this.panoramaService.getpanoramaById(id).subscribe((data) => {
      if (!data) return;

      this.panorama = data;
      this.loadKakaoMap(data.panoramaLatitude, data.panoramaLongitude);
    });
  }

  loadUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.loadKakaoMap(latitude, longitude);
        },
        () => {
          console.error("위치 정보를 가져올 수 없습니다.");
        }
      );
    } else {
      console.error("Geolocation이 지원되지 않습니다.");
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

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    // 중심 위치 마커
    const centerMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
      map: map,
    });

    // 리스트 데이터를 기반으로 마커 추가
    this.markersData.forEach((place) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.latitude, place.longitude),
        map: map,
      });

      // 마커 클릭 시 정보창 표시
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.name}</div>`,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    });
  }
}
