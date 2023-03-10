import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {       FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { JoinUsComponent } from './joinus/join-us.component';
import { HttpClientModule } from '@angular/common/http';
import {  ToastNoAnimationModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { SdgComponent } from './sdg/sdg.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ToastNoAnimationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),


  ],
  declarations: [
    JoinUsComponent,
    RegisterComponent,

    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    OurServicesComponent,
    SdgComponent,
    ContactComponent,
    FooterComponent
  ],
  exports: [
    JoinUsComponent,
    HomeComponent
  ],
  providers: []
})
export class PagesModule {}
