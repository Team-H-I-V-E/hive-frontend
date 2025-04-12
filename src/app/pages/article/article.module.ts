import { NgModule } from "@angular/core";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleRoutingModule } from "./article-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "src/app/layouts/layouts.module";
import { RouterModule } from "@angular/router";
import { ArticleWriteComponent } from "./article-write/article-write.component";
import { ImageCropperComponent } from 'ngx-image-cropper';

@NgModule({
    declarations: [
        ArticleListComponent,
        ArticleWriteComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ArticleRoutingModule,
        LayoutModule,
        RouterModule,
        ReactiveFormsModule,
        ImageCropperComponent,
    ],
    exports: [ArticleListComponent],
})
export class ArticleComponentModule {}