import { NgModule } from "@angular/core";
import { ArticleComponent } from "./article-list/article-list.component";
import { ArticleRoutingModule } from "./article-routing.module";
import { HeaderComponent } from "src/app/layouts/header/header.component";

@NgModule({
    imports: [
        ArticleComponent,
        ArticleRoutingModule,
        HeaderComponent,
    ],
})
export class ArticleComponentModule {}