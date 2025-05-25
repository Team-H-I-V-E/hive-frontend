import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeComponentRoutingModule } from './home-routing.module';
import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ChatbotPage } from "../chatbot/chatbot.page";


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeComponentRoutingModule,
    LayoutModule,
    ChatbotPage
],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
