import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleWriteComponent } from "./article-write/article-write.component";

const routes: Routes = [
    {
        path: '',
        component: ArticleListComponent
    },
    {
        path: 'write',
        component: ArticleWriteComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }