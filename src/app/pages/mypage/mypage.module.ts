import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MyPageComponentRoutingModule } from './mypage-routing.module';
import { MyPageComponent } from './mypage.component';
import { LayoutModule } from 'src/app/layouts/layouts.module';

@NgModule({
  declarations: [
    MyPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPageComponentRoutingModule,
    LayoutModule,
  ],
  exports: [MyPageComponent],
})
export class MyPageComponentModule {}
