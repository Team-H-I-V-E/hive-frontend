import { Component, OnInit } from '@angular/core';
import { CollectionStampService } from '../../services/collectionStamp/collectionStamp.service';
import { StampList } from '../../models/collectionStamp/stamp-list.interface';
import { StampDetail } from '../../models/collectionStamp/stamp-detail.interface';

@Component({
  selector: 'app-collection-stamp',
  templateUrl: './collection-stamp.component.html',
  styleUrls: ['./collection-stamp.component.scss'],
  standalone: false,
})
export class CollectionStampComponent implements OnInit {
  stamps: StampList[] = [];
  detail: StampDetail | null = null;
  showDetail = false;

  constructor(private svc: CollectionStampService) {}

  ngOnInit() {
    console.log('📨 내 스탬프 목록 요청');
    this.svc.getMyStamps().subscribe({
      next: data => {
        console.log('📦 받은 스탬프 목록:', data);
        this.stamps = data;
      },
      error: err => {
        console.error('❌ 스탬프 조회 실패:', err);
      }
    });
  }

  onImageClick(s: StampList) {
    console.log(`📨 스탬프 상세 조회 요청: stampID=${s.stampID}`);
    this.svc.getStampDetail(s.stampID).subscribe({
      next: d => {
        console.log('📦 받은 스탬프 상세:', d);
        this.detail = { ...d, stampImage: s.stampImage };
        this.showDetail = true;
      },
      error: err => {
        console.error(`❌ 스탬프 상세 조회 실패 (stampID=${s.stampID}):`, err);
      }
    });
  }

  closeDetail() {
    this.showDetail = false;
  }
}
