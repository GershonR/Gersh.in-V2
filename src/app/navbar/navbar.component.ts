import { Component, ViewChild, AfterViewInit } from '@angular/core'; 
import { MatSidenav } from '@angular/material';
import { CookieService } from 'angular2-cookie/core';

declare var jQuery:any;
@Component({ 
    selector: 'navbar', 
    templateUrl: 'navbar.component.html'
}) 

export class NavbarComponent implements AfterViewInit { 
	name = 'Angular';
	@ViewChild('sidenav') public sidenav: MatSidenav;
	
	constructor(private _cookieService:CookieService){}
	
	ngAfterViewInit(): void {
		var color = this._cookieService.get("color");
		if(color != undefined && color != null) {
			jQuery(".mat-toolbar.mat-primary").css("background", color);
		}
	}
		
	toggleSidenav() {
		this.sidenav.toggle();
	}
	
	closeSidenav() {
		this.sidenav.close();
	}
}
