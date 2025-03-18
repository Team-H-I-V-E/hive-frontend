import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ARExploreComponentRoutingModule } from './arexplore-routing.module';
import { ARExploreComponent } from './arexplore.component';
import { LayoutModule } from 'src/app/layouts/layouts.module';

@NgModule({
  declarations: [
    ARExploreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ARExploreComponentRoutingModule,
    LayoutModule,
  ],
  exports: [ARExploreComponent],
})
export class ARExploreComponentModule {}
