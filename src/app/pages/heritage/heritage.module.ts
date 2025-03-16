import { NgModule } from "@angular/core";
import { HeritageComponent } from "./heritage.component";
import { HeritageRoutingModule } from "./heritage-routing.module";

@NgModule({
    imports: [
        HeritageComponent,
        HeritageRoutingModule
    ],
    exports: [HeritageComponent]
})
export class HeritageComponentModule {}