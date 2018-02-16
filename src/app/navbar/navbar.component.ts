import { Component, ViewChild } from '@angular/core'; 
import { MatSidenav } from '@angular/material';

@Component({ 
    selector: 'navbar', 
    templateUrl: 'navbar.component.html'
}) 

export class NavbarComponent { 
	name = 'Angular';
	@ViewChild('sidenav') public sidenav: MatSidenav;
		
	toggleSidenav() {
		this.sidenav.toggle();
	}
	
	closeSidenav() {
		this.sidenav.close();
	}
}
