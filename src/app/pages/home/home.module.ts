import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeComponentRoutingModule } from './home-routing.module';
import { LayoutModule } from 'src/app/layouts/layouts.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeComponentRoutingModule,
    LayoutModule,
  ],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
