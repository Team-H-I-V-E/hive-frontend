import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpClientModule }       from '@angular/common/http';
import { CollectionStampComponent } from './collection-stamp.component';
import { CollectionStampRoutingModule } from './collection-stamp-routing.module';

@NgModule({
  declarations: [CollectionStampComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CollectionStampRoutingModule
  ]
})
export class CollectionStampModule {}
