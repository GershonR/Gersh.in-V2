import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'projects',
  styles: [`
  `],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        this.localState = data.yourData;
      });

    console.log('hello `Projects` component');
  }


}
