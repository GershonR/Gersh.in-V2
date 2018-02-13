import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CopyRightComponent } from './copyright/copyright.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavbarComponent } from './navbar/navbar.component';

import { SidenavService } from './navbar/sidenavservice.service';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


export class AppHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}


@NgModule({
  declarations: [
    AppComponent,
	NavbarComponent,
	AboutComponent,
	HomeComponent,
	CopyRightComponent,
	ProjectsComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	BrowserAnimationsModule,
	MaterialModule,
	FlexLayoutModule
  ],
  providers: [SidenavService,
  { 
    provide: HAMMER_GESTURE_CONFIG, 
    useClass: AppHammerConfig 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
