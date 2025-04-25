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

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.API_URL}/`);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.API_URL}/detail/${id}`);
  }

  createArticle(formData: FormData): Observable<Article> {
    return this.http.post<Article>(`${this.API_URL}/`, formData, {
      withCredentials: true,
    });
  }

  updateArticle(id: number, dto: UpdateArticleDto): Observable<Article> {
    return this.http.put<Article>(`${this.API_URL}/${id}`, dto, {
      withCredentials: true,
    });
  }

  deleteArticle(articleId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${articleId}`, {
      withCredentials: true,
    });
  }

  getArticlesByUserId(userId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.API_URL}/search/${userId}`);
  }
}