import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article/article.model';
import { UpdateArticleDto } from 'src/app/models/article/update-article.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly API_URL = 'http://localhost:3000/api/articles';

  constructor(private http: HttpClient) {}

  // 전체 게시글 조회
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.API_URL}/`);
  }

  // 단일 게시글 조회
  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.API_URL}/detail/${id}`);
  }

  // ✅ 게시글 작성 (FormData 버전)
  createArticle(formData: FormData): Observable<Article> {
    return this.http.post<Article>(`${this.API_URL}/`, formData);
  }

  // 게시글 수정
  updateArticle(id: number, dto: UpdateArticleDto): Observable<Article> {
    return this.http.put<Article>(`${this.API_URL}/${id}`, dto);
  }

  // 게시글 삭제
  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // 유저별 게시글 조회
  getArticlesByUserId(userId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.API_URL}/search/${userId}`);
  }
}