import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PanoramaComponent } from './panorama.component';
import { PanoramaComponentRoutingModule } from './panorama-routing.module';
import { HeaderComponent } from 'src/app/layouts/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanoramaComponentRoutingModule,
    PanoramaComponent,
    HeaderComponent,
  ],
})
export class PanoramaComponentModule {}
