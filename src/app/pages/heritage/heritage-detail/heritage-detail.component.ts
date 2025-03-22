import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HeritageService } from "src/app/services/heritage/heritage.service";
import { GetHeritagesByIdResponseData } from "src/app/models/heritage/heritage-getheritagesbyid-response-data.interface";
import { environment } from "src/environments/environment";

declare var kakao: any;

@Component({
  selector: "app-heritage-detail",
  templateUrl: "./heritage-detail.component.html",
  styleUrls: ["./heritage-detail.component.scss"],
  standalone: false
})
export class HeritageDetailComponent implements OnInit {
  heritage = {
    heritageId: 0,
    heritageName: '',
    heritageDescription: '',
    heritageLocation: '',
    heritageLatitude: 0,
    heritageLongitude: 0
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heritageService: HeritageService
  ) {}

  ngOnInit() {
    const heritageId = this.route.snapshot.paramMap.get("id");
    if (heritageId) {
      this.loadHeritageDetail(+heritageId);
    }
  }

  loadHeritageDetail(id: number) {
    this.heritageService.getHeritageById(id).subscribe((data) => {
      if (!data) return;

      this.heritage = data;
      this.loadKakaoMap(data.heritageLatitude, data.heritageLongitude);
    });
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
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
    });
    marker.setMap(map);
  }

  goToHeritageList() {
    this.router.navigate([`/heritage/heritageList`]);
  }
}
