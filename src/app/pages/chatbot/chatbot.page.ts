import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from 'src/app/services/chatbot/chatbot.service';

interface Conversation {
  id: number;
  title: string;
  history: { sender: string; message: string }[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage implements AfterViewChecked {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  userMessage: string = '';
  chatHistory: { sender: string; message: string }[] = [];
  selectedMovie: { id: number; title: string; description: string } | null = null;
  showLoading: boolean = true;
  isLoading: boolean = false;
  conversations: { id: number; title: string; history: { sender: string; message: string }[] }[] = [];
  currentChatId: number | null = null;
  editChatId: number | null = null;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
    }, 3000);
    // 기본 채팅 하나 생성
    this.startNewChat();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.chatMessages.nativeElement.scrollTop =
        this.chatMessages.nativeElement.scrollHeight;
    } catch (err) {
      console.error('스크롤 오류:', err);
    }
  }

  startNewChat() {
    const newId = Date.now();
    const newTitle = `New Chat ${this.conversations.length + 1}`;
    const newChat = { id: newId, title: newTitle, history: [] };
    this.conversations.push(newChat);
    this.currentChatId = newId;
    this.chatHistory = [];
  }

  loadChat(id: number) {
    const chat = this.conversations.find(c => c.id === id);
    if (chat) {
      this.currentChatId = id;
      this.chatHistory = [...chat.history];
    }
  }

  sendMessage() {
    if (!this.userMessage.trim() || this.currentChatId === null) return;

    const userChat = { sender: 'You', message: this.userMessage };
    const botChat = { sender: 'Chatbot', message: '답변 생성 중...' };

    this.chatHistory.push(userChat);
    this.chatHistory.push(botChat);

    const chat = this.conversations.find(c => c.id === this.currentChatId);
    if (chat) {
      chat.history = [...this.chatHistory];
    }

    this.userMessage = '';
    this.isLoading = true;

    this.chatbotService.askChatbot(userChat.message).subscribe({
      next: (res) => {
        botChat.message = res.response;
        this.isLoading = false;

        const isMovieRecommendation = res.response.includes('추천 영화');
        if (isMovieRecommendation) {
          this.selectedMovie = {
            id: 1,
            title: '예제 영화 제목',
            description: '예제 영화 설명입니다.',
          };
        }

        // 저장된 history 업데이트
        const updatedChat = this.conversations.find(c => c.id === this.currentChatId);
        if (updatedChat) {
          updatedChat.history = [...this.chatHistory];
        }
      },
      error: (err) => {
        console.error('Error communicating with chatbot:', err);
        botChat.message = '오류가 발생했습니다. 다시 시도해 주세요.';
        this.isLoading = false;

        const chat = this.conversations.find(c => c.id === this.currentChatId);
        if (chat) {
          chat.history = [...this.chatHistory];
        }
      }
    });
  }

  // 더블클릭 시 편집 모드로 전환
editTitle(chatId: number, event: MouseEvent) {
  event.stopPropagation(); // 클릭 이벤트 버블링 방지
  this.editChatId = chatId;
}

// 제목 저장 및 편집 종료
saveTitle(chat: { id: number; title: string; history: any[] }) {
  this.editChatId = null;

  // 필요 시 제목 빈값 방지
  if (!chat.title.trim()) {
    chat.title = 'Untitled Chat';
  }
}

  clearChat() {
    this.chatHistory = [];
    if (this.currentChatId !== null) {
      const chat = this.conversations.find(c => c.id === this.currentChatId);
      if (chat) chat.history = [];
    }
    this.selectedMovie = null;
  }

  sendQuickReply(quickReply: string) {
    this.userMessage = quickReply;
    this.sendMessage();
  }
}
