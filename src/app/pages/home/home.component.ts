import { Router } from '@angular/router';
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
  // 챗봇 모달 열림/닫힘 상태
  isChatbotModalOpen: boolean = false;

  assets: CulturalAsset[] = [];
  currentAsset: CulturalAsset | null = null;
  currentIndex: number = 0;
  intervalId: any = null;

  private readonly API_URL = 'http://localhost:3000';

  // 생성자에 Router와 HttpClient 둘 다 주입
  constructor(private router: Router, private http: HttpClient) {}
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
      const nextIndex = (this.currentIndex + 1) % this.assets.length;
      this.updateAsset(nextIndex);
    }, 8000);
  }

  goToPreviousAsset(): void {
    if (this.assets.length === 0) return;
    const prevIndex = (this.currentIndex - 1 + this.assets.length) % this.assets.length;
    this.updateAsset(prevIndex);
  }

  goToNextAsset(): void {
    if (this.assets.length === 0) return;
    const nextIndex = (this.currentIndex + 1) % this.assets.length;
    this.updateAsset(nextIndex);
  }

  goToAsset(index: number): void {
    this.updateAsset(index);
  }

  showAsset = true;

  updateAsset(index: number): void {
    this.showAsset = false;
    setTimeout(() => {
      this.currentIndex = index;
      this.currentAsset = this.assets[index];
      this.showAsset = true;
    }, 10);
  }

  // 챗봇 페이지로 이동
  navigateToChatbotPage() {
    this.router.navigate(['/chatbot']);
  }

  // 챗봇 모달 열기/닫기 토글
  toggleChatbotModal() {
    this.isChatbotModalOpen = !this.isChatbotModalOpen;
  }

  // 모달 닫기 처리
  closeChatbotModal() {
    this.isChatbotModalOpen = false;
  }
}
