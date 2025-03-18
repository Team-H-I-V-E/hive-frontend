import { NgModule } from "@angular/core";
import { HeritageComponent } from "./heritage.component";
import { HeritageRoutingModule } from "./heritage-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "src/app/layouts/layouts.module";

@NgModule({
    declarations: [
        HeritageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeritageRoutingModule,
        LayoutModule,
    ],
    exports: [HeritageComponent]
})
export class HeritageComponentModule {}