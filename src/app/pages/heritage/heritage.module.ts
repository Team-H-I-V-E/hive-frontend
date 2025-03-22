import { NgModule } from "@angular/core";
import { HeritageRoutingModule } from "./heritage-routing.module";
import { HeritageListComponent } from './heritage-list/heritage-list.component';
import { HeritageDetailComponent } from './heritage-detail/heritage-detail.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "src/app/layouts/layouts.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        HeritageListComponent,
        HeritageDetailComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeritageRoutingModule,
        LayoutModule, 
    ]
})
export class HeritageComponentModule { }
