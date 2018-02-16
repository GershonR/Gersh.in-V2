import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
@Component({
  selector: 'photos',
  styles: [`
  `],
  templateUrl: './photos.component.html'
})
export class PhotosComponent implements OnInit {
  photos: Object;
  constructor(public route: ActivatedRoute, private httpClient: HttpClient) {}

  public ngOnInit() {
   var test3;
	this.httpClient.get('assets/json/photos.json').subscribe((data: Response) => {
	this.photos = Array.of(data.json());});
	console.log(this.photos);
  }


}
