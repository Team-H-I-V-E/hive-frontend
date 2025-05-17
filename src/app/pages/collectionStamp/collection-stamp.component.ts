import { Component, OnInit } from '@angular/core';
import { HttpClient }        from '@angular/common/http';
import { StampList } from 'src/app/models/collectionStamp/stamp-list.interface';

@Component({
  selector: 'app-collection-stamp',
  templateUrl: './collection-stamp.component.html',
  styleUrls: ['./collection-stamp.component.scss'],
  standalone: false,
})
export class CollectionStampComponent implements OnInit {
  private readonly API_URL = '/api/mystamps';

  stamps: StampList[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStamps();
  }

  private loadStamps() {
    console.log('📨 내 스탬프 목록 요청');
    this.http.get<StampList[]>(this.API_URL).subscribe({
      next: (data) => {
        this.stamps = data;
        console.log('📦 받은 스탬프 목록:', this.stamps);
      },
      error: (err) => {
        console.error('❌ 스탬프 조회 실패', err);
      },
    });
  }
}
