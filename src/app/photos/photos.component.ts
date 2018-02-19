import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { LightboxConfig, Lightbox, LightboxEvent, LIGHTBOX_EVENT, IEvent, IAlbum } from 'angular2-lightbox';
import { Subscription } from 'rxjs/Subscription';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
@Component({
  selector: 'photos',
  styleUrls: ['./photos.css'],
  templateUrl: './photos.component.html',
  host: {
    class: 'columns'
  }
})
export class PhotosComponent {
  public albumsList = [ 
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/1.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/2.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/3.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/4.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/5.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/6.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/7.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/8.jpg' },
		{'caption': '2016 hunting trip with friends.', 'src': 'assets/img/photos/9.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/10.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/11.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/12.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/13.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/14.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/15.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/16.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/17.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'src': 'assets/img/photos/18.jpg' },
		{'caption': 'AWAJI ISLAND 2017 JAPAN TRIP.', 'src': 'assets/img/photos/19.jpg' },
		{'caption': 'AWAJI ISLAND 2017 JAPAN TRIP.', 'src': 'assets/img/photos/20.jpg' },
		{'caption': 'AWAJI ISLAND 2017 JAPAN TRIP.', 'src': 'assets/img/photos/21.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/22.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/23.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/24.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/25.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/26.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/27.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/28.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/29.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/30.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/31.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/32.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'src': 'assets/img/photos/33.jpg' },
	]
	
	
  public albums: Array<IAlbum>;
  private _options: Object;
  private _subscription: Subscription;
  public page: number = 1;
  constructor(private _lighboxConfig: LightboxConfig, private _lightbox: Lightbox, private _lightboxEvent: LightboxEvent,) {
	this.albums = [];
    this._options = {};
    for (let i = 0; i < this.albumsList.length; i++) {
	
      const src = this.albumsList[i].src;
      const caption = this.albumsList[i].caption;
      const thumb = this.albumsList[i].src;
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
      this.albums.push(album);
    }
	_lighboxConfig.fadeDuration = 1;
  }

  open(index: number): void {
	var pos = (this.page - 1) * 9 + index;
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));

    // override the default config
    this._lightbox.open(this.albums, pos, { wrapAround: true, showImageNumberLabel: true });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }
  
  needsNewRow(index) {
	  if(index % 3 == 0)
		  return true;
	  return false;
  }



}
