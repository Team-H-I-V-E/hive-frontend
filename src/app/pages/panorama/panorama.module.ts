import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PanoramaComponent } from './panorama.component';
import { PanoramaComponentRoutingModule } from './panorama-routing.module';
import { LayoutModule } from 'src/app/layouts/layouts.module';

@NgModule({
  declarations: [
    PanoramaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanoramaComponentRoutingModule,
    LayoutModule,
  ],
  exports: [PanoramaComponent],
})
export class PanoramaComponentModule {}
