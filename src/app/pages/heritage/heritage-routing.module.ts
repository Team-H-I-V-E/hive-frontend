import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeritageComponent } from "./heritage.component";

const routes: Routes = [
    {
        path: '',
        component: HeritageComponent
    }
    // {
    //     path: 'heritagedetail',
    //     component: HeritageDetailComponent
    // },
    // {
    //     path: 'heritagefavorite',
    //     component: HeritageFavoriteComponent
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeritageRoutingModule {}