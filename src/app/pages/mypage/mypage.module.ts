import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { MyPageComponentRoutingModule } from './mypage-routing.module';
import { MyPageComponent } from './mypage.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPageComponentRoutingModule,
    MyPageComponent,
    HeaderComponent,
  ],
})
export class MyPageComponentModule {}
