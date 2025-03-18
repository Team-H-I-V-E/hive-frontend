import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeritageListComponent } from './heritage-list/heritage-list.component';
import { HeritageDetailComponent } from './heritage-detail/heritage-detail.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeritageRoutingModule } from './heritage-routing.module';

@NgModule({
    declarations: [
        HeritageListComponent,
        HeritageDetailComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        HeritageRoutingModule,

    ]
})
export class HeritageComponentModule { }
