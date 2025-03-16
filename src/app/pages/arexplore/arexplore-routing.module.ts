import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ARExploreComponent } from './arexplore.component';

const routes: Routes = [
  {
    path: '',
    component: ARExploreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ARExploreComponentRoutingModule {}
