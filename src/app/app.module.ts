import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { LightboxModule } from 'ngx-lightbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'ngx-color-picker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CopyRightComponent } from './copyright/copyright.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PhotosComponent } from './photos/photos.component';
import { LinksComponent } from './links/links.component';
import { ExtrasComponent } from './extras/extras.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CookieService, CookieOptions } from 'angular2-cookie/core';

import * as Hammer from 'hammerjs';


export class AppHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
  buildHammer(element: HTMLElement) {
	  delete Hammer.defaults.cssProps.userSelect;
      return new Hammer(element, {
          inputClass: Hammer.TouchInput
      });
  }
}


@NgModule({
  declarations: [
    AppComponent,
	NavbarComponent,
	AboutComponent,
	HomeComponent,
	CopyRightComponent,
	ProjectsComponent,
	PhotosComponent,
	LinksComponent,
	ExtrasComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule, 
	AppRoutingModule,
	BrowserAnimationsModule,
	MaterialModule,
	FlexLayoutModule,
	LightboxModule,
	NgxPaginationModule,
	ColorPickerModule,
	SweetAlert2Module.forRoot(),
	ScrollToModule.forRoot()
  ],
  providers: [HttpClientModule, CookieService, { provide: CookieOptions, useValue: {} },
  { 
    provide: HAMMER_GESTURE_CONFIG, 
    useClass: AppHammerConfig 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
