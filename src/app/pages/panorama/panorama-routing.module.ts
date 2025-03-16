import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanoramaComponent } from './panorama.component';

const routes: Routes = [
  {
    path: '',
    component: PanoramaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanoramaComponentRoutingModule {}