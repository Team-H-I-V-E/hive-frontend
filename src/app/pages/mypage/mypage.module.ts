import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyPageComponentRoutingModule } from './mypage-routing.module';
import { MyPageComponent } from './mypage.component';

@NgModule({
  declarations: [
    MyPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyPageComponentRoutingModule,
  ],
  exports: [MyPageComponent],
})
export class MyPageComponentModule {}
