import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'copyright',
  styles: [`
  `],
  templateUrl: './copyright.component.html'
})
export class CopyRightComponent implements OnInit {

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

    console.log('hello `copyright` component');
  }


}
