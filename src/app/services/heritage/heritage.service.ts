import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetHeritagesResponseData } from 'src/app/models/heritage/heritage-getheritage-response-data.interface';
import { GetHeritagesByIdResponseData } from 'src/app/models/heritage/heritage-getheritagesbyid-response-data.interface';

@Injectable({
  providedIn: 'root',
})
export class HeritageService {
  private apiUrl = 'http://localhost:3000/api/heritages';  // NestJS 백엔드 URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // 유산 목록(리스트) 조회
  getHeritages(): Observable<GetHeritagesResponseData[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<GetHeritagesResponseData[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  // 유산 특정 조회 (3D 모델 URL 포함)
  getHeritageById(id: number): Observable<GetHeritagesByIdResponseData> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<GetHeritagesByIdResponseData>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
