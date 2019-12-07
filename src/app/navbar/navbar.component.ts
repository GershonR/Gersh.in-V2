import { Component, ViewChild, AfterViewInit } from '@angular/core'; 
import { MatSidenav } from '@angular/material';
import { CookieService } from 'angular2-cookie/core';
import { environment } from '../../environments/environment';

declare var jQuery:any;
@Component({ 
    selector: 'navbar', 
	styleUrls: ['./navbar.css'],
    templateUrl: 'navbar.component.html'
}) 

export class NavbarComponent implements AfterViewInit {
	
	public version: string = environment.VERSION;
	
	navItems = [
		{name: 'Home', route: '', icon: 'home'},
		{name: 'Projects', route: '/projects', icon: 'folder'},
		{name: 'Photos', route: '/photos', icon: 'photo'},
		{name: 'Links', route: '/links', icon: 'https'},
		{name: 'About', route: '/about', icon: 'person'},
		{name: 'Extras', route: '/extras', icon: 'apps'}
	];
	
	@ViewChild('sidenav', {static: false}) public sidenav: MatSidenav;
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
	
	isFixedFooter() {
		return this._cookieService.get("footer") == 'true';
	}
	
	isFixedHeader() {
		return this._cookieService.get("header") == 'true';
	}
}
