import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  styles: [`
  `],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  public greeting = "Good night";

  public ngOnInit() {
	var hour = (new Date()).getHours();
	if (hour >= 6 && hour < 12) {
		this.greeting = "Good morning";
	} else if (hour >= 12 && hour < 18) {
		this.greeting = "Good afternoon";
	} else if (hour >= 18 && hour < 24) {
		this.greeting = "Good evening";
	} else {
		this.greeting = "Good night";
	}
  }


}
