import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';

import { HomeComponent } from '@/views/home/home.component';
import { HotelsComponent } from '@/views/hotels/hotels.component';
import { RestaurantsComponent } from '@/views/restaurants/restaurants.component';

import { SignupComponent } from '@/views/signup/signup.component';
import { LoginComponent } from '@/views/login/login.component';

import { MyAccountComponent } from '@/views/my-account/my-account.component';

import { ThingsToDoComponent } from '@/views/things-to-do/things-to-do.component';
import { HomeServicesComponent } from '@/views/home-services/home-services.component';

import { SearchResultsComponent } from '@/views/search-results/search-results.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'hotels',
    component: HotelsComponent
  },
  {
    path: 'things-to-do',
    component: ThingsToDoComponent
  },
  {
    path: 'home-services',
    component: HomeServicesComponent
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: 'my-account',
    canActivate: [AuthGuard],
    component: MyAccountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
