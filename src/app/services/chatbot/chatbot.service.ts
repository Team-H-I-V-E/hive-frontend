import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:3000/chatbot/ask'; // NestJS API URL

  constructor(private http: HttpClient) {}

  /**
   * 사용자 프롬프트를 서버에 전달하고 응답을 가져옵니다.
   * @param prompt 사용자 입력 메시지
   * @returns 서버에서 반환된 메시지
   */
  askChatbot(prompt: string): Observable<{ response: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ response: string }>(
      this.apiUrl,
      { prompt },
      { headers },
    );
  }
}
