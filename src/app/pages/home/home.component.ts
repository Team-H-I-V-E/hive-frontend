import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CulturalAsset } from 'src/app/models/home/home-response-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  assets: CulturalAsset[] = [];
  currentAsset: CulturalAsset | null = null;
  currentIndex: number = 0;
  intervalId: any = null;

  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('🏠 HomeComponent loaded!');
    this.loadCulturalAssets();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadCulturalAssets(): void {
    this.http.get<CulturalAsset[]>(`${this.API_URL}/home`).subscribe({
      next: (data) => {
        this.assets = data;
        console.log('📦 문화유산 데이터:', this.assets);
        this.startRotatingAssets();
      },
      error: (err) => {
        console.error('❌ 데이터 로드 실패:', err);
      }
    });
  }

  startRotatingAssets(): void {
    if (this.assets.length === 0) return;
    this.currentAsset = this.assets[0];

    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.assets.length;
      this.currentAsset = this.assets[this.currentIndex];
    }, 5000);
  }
}