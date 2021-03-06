import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from '@/helpers/jwt.interceptor';
import { ErrorInterceptor } from '@/helpers/error.interceptor';

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
import { MainSearchContainerComponent } from './components/main-search-container/main-search-container.component';
import { MainSearchInputComponent } from './components/main-search-input/main-search-input.component';
import { LocationSelectComponent } from './components/location-select/location-select.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { RandNearbyComponent } from './components/rand-nearby/rand-nearby.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { ContentRowComponent } from './components/content-row/content-row.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabsSectionComponent } from './components/tabs/tabs-section/tabs-section.component';
import { TabsBodyComponent } from './components/tabs/tabs-body/tabs-body.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { SingleBusinessComponent } from './views/single-business/single-business.component';
import { CssSpinnerComponent } from './components/css-spinner/css-spinner.component';
import { ReviewInputComponent } from './components/reviews/review-input/review-input.component';

// Import Providers
import { DataService } from './services/data/data.service';
import { AuthenticationService } from './services/authentication.service';

// Dependencies
import { RatingModule } from 'ng-starrating';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlideshowModule } from 'ng-simple-slideshow';
import { LightboxModule } from 'ngx-lightbox';
import { ReviewsListComponent } from './components/reviews/reviews-list/reviews-list.component';
import { ReviewComponent } from './components/reviews/review/review.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AlertComponent } from './components/alert/alert.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NgxSmartModalModule  } from 'ngx-smart-modal';
import { ReviewPlaceholderComponent } from './components/reviews/review-placeholder/review-placeholder.component';
import { SearchPlaceholderComponent } from './components/search-placeholder/search-placeholder.component';
import { GravatarDirective } from './directives/gravatar.directive';


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
    HomeServicesComponent,
    MainSearchContainerComponent,
    MainSearchInputComponent,
    LocationSelectComponent,
    HeroImageComponent,
    RandNearbyComponent,
    BusinessCardComponent,
    ContentRowComponent,
    TabsComponent,
    TabsSectionComponent,
    TabsBodyComponent,
    TabComponent,
    CssSpinnerComponent,
    SingleBusinessComponent,
    ReviewsListComponent,
    ReviewComponent,
    AlertComponent,
    ReviewInputComponent,
    UserCardComponent,
    ReviewPlaceholderComponent,
    SearchPlaceholderComponent,
    GravatarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RatingModule,
    NgxPaginationModule,
    SlideshowModule,
    LightboxModule,
    DpDatePickerModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DataService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
