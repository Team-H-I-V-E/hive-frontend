import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeritageComponent } from "./heritage.component";
import { HeritageDetailComponent } from "./heritage-detail/heritage-detail.component";
import { HeritageListComponent } from "./heritage-list/heritage-list.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'heritageList',  
        pathMatch: 'full'
    },
    {
        path: 'heritagedetail/:id',
        component: HeritageDetailComponent
    },
    {
        path: 'heritageList',
        component: HeritageListComponent
    },

    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeritageRoutingModule {}