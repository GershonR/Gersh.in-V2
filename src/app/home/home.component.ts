import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: '',
  styleUrls: ['./home.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent  {
	
	public muted = true;
	
	toggleMute() {
		console.log(this.muted);
		this.muted = !this.muted;
	}

}
