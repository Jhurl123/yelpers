import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from '@/components/top-header/top-header.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    SlideMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
