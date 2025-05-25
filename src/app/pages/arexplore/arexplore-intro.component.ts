import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ar-intro',
  templateUrl: 'arexplore-intro.component.html',
})

export class ARExploreIntroComponent implements OnInit {
  messages: string[] = [
    '주변 스탬프를 찾아보세요!',
    '세종의 유산을 탐험해보세요!',
    '카메라를 허용해 AR을 시작하세요!',
    '문화재를 AR로 직접 체험하세요!',
  ];

  currentMessage: string = this.messages[0];
  private messageIndex = 0;

  @ViewChild('startButton') startButton!: ElementRef<HTMLButtonElement>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 문구 순환
    setInterval(() => {
      this.messageIndex = (this.messageIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[this.messageIndex];
    }, 3000);

    // START 버튼 효과
    setInterval(() => {
      if (!this.startButton) return;

      const btn = this.startButton.nativeElement;
      const currentBg = getComputedStyle(btn).backgroundColor;

      if (currentBg === 'rgb(35, 31, 31)') {
        btn.style.backgroundColor = '#918E7C';
        btn.style.color = '#231F1F';
      } else {
        btn.style.backgroundColor = '#231F1F';
        btn.style.color = '#918E7C';
      }
    }, 800);
  }

  goToAR() {
    if (!this.isMobile()) {
      alert('📱 AR Explore 기능은 GPS 기반으로 모바일 환경에서 가장 정확하게 동작합니다.');
    }

    this.router.navigate(['/arexplore/main']);
  }

  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)
      || typeof window.orientation !== 'undefined'
      || window.innerWidth <= 768;
  }
}
