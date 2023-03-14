import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { JoinUsComponent } from './pages/joinus/join-us.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: 'services', component: HomeComponent },
  { path: 'sdg', component: HomeComponent },
  { path: 'contact', component: HomeComponent },
  { path: 'joinus', component: JoinUsComponent },
  { path : 'register/:email/:token/:matriculate', component: RegisterComponent},
  { path : 'register/:email/:token/:matriculate/:role', component: RegisterComponent},
  { path: '**', pathMatch:'full', component:PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
