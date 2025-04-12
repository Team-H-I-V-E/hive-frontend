import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeritageDetailComponent } from "./heritage-detail/heritage-detail.component";
import { HeritageListComponent } from "./heritage-list/heritage-list.component";

const routes: Routes = [
    {
      path: '',
      component: HeritageListComponent
    },
    {
      path: ':id',
      component: HeritageDetailComponent
    }
  ];  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeritageRoutingModule {}