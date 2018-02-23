import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

declare var jQuery:any;
@Component({
  selector: 'extras',
  styles: [`
  `],
  templateUrl: './extras.component.html'
})
export class ExtrasComponent {
	
 public defaultColor: string = '#3f51b5';
 public color: string = '#3f51b5';
 checkedFooter: boolean = true;
 checkedHeader: boolean = false;
 
  constructor(private _cookieService:CookieService){}
 
  getCookie(key: string){
    return this._cookieService.get(key);
  }

  public onChangeColor() {
	jQuery(".mat-toolbar.mat-primary").css("background", this.color);
	this._cookieService.put("color", this.color);
  }
  
  public restoreDefault() {
	jQuery(".mat-toolbar.mat-primary").css("background", this.defaultColor);
	this._cookieService.put("color", this.defaultColor);
  }
  
  footerToggle(event) {
	this._cookieService.put("footer", ""+!this.checkedFooter);
  }
  
  isCheckedFooter() {
	  this.checkedFooter = this._cookieService.get("footer") == 'true'
	  return this.checkedFooter;
  }

  headerToggle(event) {
	this._cookieService.put("header", ""+!this.checkedHeader);
  }
  
  isCheckedHeader() {
	  this.checkedHeader = this._cookieService.get("header") == 'true'
	  return this.checkedHeader;
  }



}
