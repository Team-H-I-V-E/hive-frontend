import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeritageDetailComponent } from "./heritage-detail/heritage-detail.component";
import { HeritageListComponent } from "./heritage-list/heritage-list.component";

const routes: Routes = [
    {
        path: 'heritageList',
        component: HeritageListComponent
    },
    {
        path: 'heritagedetail/:id',
        component: HeritageDetailComponent
    },   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeritageRoutingModule {}