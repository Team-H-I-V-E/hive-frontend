import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';
import { StampList } from 'src/app/models/collectionStamp/stamp-list.interface';
import { StampDetail } from 'src/app/models/collectionStamp/stamp-detail.interface';

@Injectable({ providedIn: 'root' })
export class CollectionStampService {
  private readonly API = '/api/mystamps';

  constructor(private http: HttpClient) {}

  // 내 스탬프 목록 가져오기
  getMyStamps(): Observable<StampList[]> {
    return this.http.get<StampList[]>(this.API);
  }

  // 스탬프 상세 가져오기
  getStampDetail(stampId: number): Observable<StampDetail> {
    return this.http.get<StampDetail>(`${this.API}/${stampId}`);
  }
}
