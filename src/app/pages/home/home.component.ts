import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  // 챗봇 모달 열림/닫힘 상태
  isChatbotModalOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('🏠 HomeComponent loaded!');
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
