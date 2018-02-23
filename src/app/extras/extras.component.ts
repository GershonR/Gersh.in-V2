import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import $ = require("jquery");
@Component({
  selector: 'extras',
  styles: [`
  `],
  templateUrl: './extras.component.html'
})
export class ExtrasComponent {
	
 public defaultColor: string = '#3f51b5';
 public color: string = '#3f51b5'
 
  public onEventLog(event: string, data: any) {
    console.log(event, data);
  }

  public onChangeColor() {
	$(".mat-toolbar.mat-primary").css("background", this.color);
  }
  
  public restoreDefault() {
	$(".mat-toolbar.mat-primary").css("background", this.defaultColor);
  }



}
