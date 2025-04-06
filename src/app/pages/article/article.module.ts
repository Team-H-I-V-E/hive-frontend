import { NgModule } from "@angular/core";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleRoutingModule } from "./article-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LayoutModule } from "src/app/layouts/layouts.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ArticleListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ArticleRoutingModule,
        LayoutModule,
        RouterModule
    ],
    exports: [ArticleListComponent],
})
export class ArticleComponentModule {}