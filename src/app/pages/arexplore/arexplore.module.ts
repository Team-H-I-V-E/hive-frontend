import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ARExploreComponentRoutingModule } from './arexplore-routing.module';
import { ARExploreComponent } from './arexplore.component';
import { LayoutModule } from 'src/app/layouts/layouts.module';
import { StampModalComponent } from 'src/app/components/stamp-modal/stamp-modal.component';

@NgModule({
  declarations: [
    ARExploreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ARExploreComponentRoutingModule,
    LayoutModule,
    StampModalComponent
  ],
  exports: [ARExploreComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ARExploreComponentModule {}
