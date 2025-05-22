import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.messageIndex = (this.messageIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[this.messageIndex];
    }, 3000);
  }

  goToAR() {
    this.router.navigate(['/arexplore/main']);
  }
}
