import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionStampComponent } from './collection-stamp.component';

const routes: Routes = [
  { path: '', component: CollectionStampComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionStampRoutingModule {}
