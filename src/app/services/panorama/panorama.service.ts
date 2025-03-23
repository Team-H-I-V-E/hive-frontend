import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPanoramaResponseData } from 'src/app/models/panorama/panorama-getpanorama-response-data.interface';
import { GetPanoramaByIdResponseData } from 'src/app/models/panorama/panorama-getpanoramabyid-response-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PanoramaService {
  private apiUrl = 'http://localhost:3000/api/panorama';  // NestJS 백엔드 URL

  constructor(private http: HttpClient) {}

  getPanorama(): Observable<GetPanoramaResponseData[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<GetPanoramaResponseData[]>(`${this.apiUrl}`,{headers});
  }

  getpanoramaById(id: number): Observable<GetPanoramaByIdResponseData> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<GetPanoramaByIdResponseData>(`${this.apiUrl}/${id}`,{headers});
  }
}