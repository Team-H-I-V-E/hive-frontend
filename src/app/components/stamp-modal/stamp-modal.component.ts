import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stamp-modal',
  templateUrl: './stamp-modal.component.html',
  styleUrls: ['./stamp-modal.component.scss'],
  imports: [CommonModule],
})
export class StampModalComponent {
  @Input() stampName: string = '';
  @Input() stampDescription: string = '';
  @Input() stampId: number = 0;
  @Input() stampImg: string = '';
  @Output() closeModal = new EventEmitter<number>();

  close() {
    this.closeModal.emit(this.stampId);
  }
}
