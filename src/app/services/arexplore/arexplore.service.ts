import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ArExploreService {
    private baseUrl = `${environment.apiBaseUrl}/api/arexperience`;

  constructor(private http: HttpClient) {}

  // 유저가 아직 못 받은 스탬프 목록 가져오기
  getUnacquiredStamps(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}/unacquired-stamps`);
  }

  // 스탬프 획득 요청
  acquireStamp(userId: number, stampId: number, lat: number, lng: number) {
    return this.http.post(`${this.baseUrl}/${userId}/${stampId}`, {
      userLatitude: lat,
      userLongitude: lng,
    });
  }
}
