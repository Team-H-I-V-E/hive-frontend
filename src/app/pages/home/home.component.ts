import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CulturalAsset } from 'src/app/models/home/home-response-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  assets: CulturalAsset[] = [];
  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('🏠 HomeComponent loaded!');
    this.loadCulturalAssets();
  }

  loadCulturalAssets(): void {
    this.http.get<CulturalAsset[]>(`${this.API_URL}/home`).subscribe({
      next: (data) => {
        this.assets = data;
        console.log('📦 문화유산 데이터:', this.assets);
      },
      error: (err) => {
        console.error('❌ 데이터 로드 실패:', err);
      }
    });
  }
}