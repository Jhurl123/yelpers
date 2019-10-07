import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from '@/components/top-header/top-header.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { SearchComponent } from './components/slide-menu/search/search.component';
import { MobileLogoComponent } from './components/slide-menu/mobile-logo/mobile-logo.component';
import { MobileNavComponent } from './components/slide-menu/mobile-nav/mobile-nav.component';
import { HomeComponent } from './views/home/home.component';
import { SignupComponent } from './views/signup/signup.component';
import { LoginComponent } from './views/login/login.component';
import { RestaurantsComponent } from './views/restaurants/restaurants.component';
import { HotelsComponent } from './views/hotels/hotels.component';
import { MyAccountComponent } from './views/my-account/my-account.component';
import { SearchResultsComponent } from './views/search-results/search-results.component';
import { ThingsToDoComponent } from './views/things-to-do/things-to-do.component';
import { HomeServicesComponent } from './views/home-services/home-services.component';


@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    SlideMenuComponent,
    SearchComponent,
    MobileLogoComponent,
    MobileNavComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    RestaurantsComponent,
    HotelsComponent,
    MyAccountComponent,
    SearchResultsComponent,
    ThingsToDoComponent,
    HomeServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
