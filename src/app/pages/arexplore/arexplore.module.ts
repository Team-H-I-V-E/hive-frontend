import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { ARExploreComponentRoutingModule } from './arexplore-routing.module';
import { ARExploreComponent } from './arexplore.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ARExploreComponentRoutingModule,
    ARExploreComponent,
    HeaderComponent,
  ],
})
export class ARExploreComponentModule {}
