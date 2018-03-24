import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var jQuery:any;
@Component({
  selector: '',
  styleUrls: ['./home.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
	
	public muted = true;
	
	toggleMute() {
		console.log(this.muted);
		this.muted = !this.muted;
	}
	
	ngAfterViewInit(): void {
		jQuery('h1').css({'opacity':( 100-jQuery(window).scrollTop() )/100});
		
		jQuery(window).scroll(function(){
			jQuery(".top").css("opacity", 1 - jQuery(window).scrollTop() / 250);
		});
	}

}
