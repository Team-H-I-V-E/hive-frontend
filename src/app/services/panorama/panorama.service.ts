import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GetPanoramaByIdResponseData,
  GetPanoramaResponseData,
} from 'src/app/models/panorama/panorama-response-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PanoramaService {
  private apiUrl = 'http://localhost:3000/api/panorama';
  private favoriteUrl = 'http://localhost:3000/api/panoramaFavorite';

  constructor(private http: HttpClient) { }

  // 파노라마 전체 조회
  getPanorama(): Observable<GetPanoramaResponseData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<GetPanoramaResponseData[]>(`${this.apiUrl}`, { headers });
  }

  // 특정 파노라마 상세 조회
  getpanoramaById(id: number): Observable<GetPanoramaByIdResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<GetPanoramaByIdResponseData>(`${this.apiUrl}/${id}`, { headers });
  }

  // 즐겨찾기 목록 조회 (by userId)
  getFavorites(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.favoriteUrl}/${userId}`);
  }

  // 즐겨찾기 추가
  addFavorite(userId: number, panoramaId: number): Observable<void> {
    return this.http.post<void>(`${this.favoriteUrl}`, {
      userId,
      panoramaId,
    });
  }

  // 즐겨찾기 삭제
  deleteFavorite(userId: number, panoramaId: number): Observable<void> {
    return this.http.delete<void>(`${this.favoriteUrl}/user/${userId}/panorama/${panoramaId}`);
  }
}