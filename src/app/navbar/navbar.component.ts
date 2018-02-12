import { Component, OnInit, ViewChild } from '@angular/core'; 
import { SidenavService } from './sidenavservice.service';
import { MatSidenav } from '@angular/material';

@Component({ 
    selector: 'navbar', 
    templateUrl: 'navbar.component.html'
}) 

export class NavbarComponent implements OnInit { 
	name = 'Angular';
	
	@ViewChild('sidenav') public sidenav: MatSidenav;
  
	constructor(private sidenavService: SidenavService) {}

	ngOnInit(): void {
		this.sidenavService.setSidenav(this.sidenav);
	}
		
	toggleSidenav() {
		this.sidenavService.toggle();
	}
	
	closeSidenav() {
		this.sidenavService.close();
	}
	
	openSidenav() {
		this.sidenavService.open();
	}
}
