import { NgModule } from "@angular/core";
import { ArticleComponent } from "./article-list/article-list.component";
import { ArticleRoutingModule } from "./article-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "src/app/layouts/layouts.module";

@NgModule({
    declarations: [
        ArticleComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ArticleRoutingModule,
        LayoutModule,
    ],
    exports: [ArticleComponent],
})
export class ArticleComponentModule {}