import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layouts/layouts.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent], 
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}