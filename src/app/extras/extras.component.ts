import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

declare var jQuery:any;
@Component({
  selector: 'extras',
  styles: [`
  `],
  templateUrl: './extras.component.html'
})
export class ExtrasComponent {
	
 public defaultColor: string = '#3f51b5';
 public color: string = '#3f51b5'
 
  constructor(private _cookieService:CookieService){}
 
  getCookie(key: string){
    return this._cookieService.get(key);
  }
 
  public onEventLog(event: string, data: any) {
    console.log(event, data);
  }

  public onChangeColor() {
	jQuery(".mat-toolbar.mat-primary").css("background", this.color);
	this._cookieService.put("color", this.color);
  }
  
  public restoreDefault() {
	jQuery(".mat-toolbar.mat-primary").css("background", this.defaultColor);
	this._cookieService.put("color", this.defaultColor);
  }



}
