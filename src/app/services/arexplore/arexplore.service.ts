import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp } from 'src/app/models/arexplore/stamp.model';
import { environment } from 'src/environment/environment';

@Injectable({ 
  providedIn: 'root' 
})
export class ArExploreService {
    private readonly API_URL = 'http://localhost:3000/api/arexplore';

  constructor(private http: HttpClient) {}

  // 사용자가 획득하지 않은 스탬프 목록 가져오기
  getUnacquiredStamps(userId: number): Observable<Stamp[]> {
    return this.http.get<Stamp[]>(`${this.API_URL}/${userId}/unacquired-stamps`);
  }

  // 스탬프 획득 요청
  acquireStamp(userId: number, stampId: number, lat: number, lng: number) {
    const ret = this.http.post(`${this.API_URL}/${userId}/${stampId}`, {
      userLatitude: lat,
      userLongitude: lng,
    });
    return ret;
  }
}
