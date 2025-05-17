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
    this.svc.getMyStamps().subscribe(data => this.stamps = data);
  }

  onImageClick(s: StampList) {
    this.svc.getStampDetail(s.stampID).subscribe(d => {
      this.detail = { ...d, stampImage: s.stampImage };
      this.showDetail = true;
    });
  }

  closeDetail() {
    this.showDetail = false;
  }
}
