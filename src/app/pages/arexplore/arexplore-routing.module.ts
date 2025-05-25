import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ARExploreComponent } from './arexplore.component';
import { ARExploreIntroComponent } from './arexplore-intro.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: ARExploreIntroComponent},
  { path: 'main', component: ARExploreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ARExploreComponentRoutingModule {}
