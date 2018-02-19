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
  		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis9.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis9.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis8.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis8.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis7.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis7.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis6.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis6.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis5.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis5.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis4.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis4.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis3.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis3.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis2.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis2.jpg' },
		{'caption': 'MINNEAPOLIS 2017.', 'thumb': 'assets/img/thumbnails/2017-08-18-minneapolis1.jpg', 'src': 'assets/img/photos/2017-08-18-minneapolis1.jpg' },
  		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/44.jpg', 'src': 'assets/img/photos/44.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/45.jpg', 'src': 'assets/img/photos/45.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/46.jpg', 'src': 'assets/img/photos/46.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/47.jpg', 'src': 'assets/img/photos/47.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/48.jpg', 'src': 'assets/img/photos/48.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/49.jpg', 'src': 'assets/img/photos/49.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/50.jpg', 'src': 'assets/img/photos/50.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/51.jpg', 'src': 'assets/img/photos/51.jpg' },
		{'caption': 'YOKOHOMA 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/52.jpg', 'src': 'assets/img/photos/52.jpg' },
		{'caption': 'AWAJI ISLAND 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/19.jpg', 'src': 'assets/img/photos/19.jpg' },
		{'caption': 'AWAJI ISLAND 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/20.jpg', 'src': 'assets/img/photos/20.jpg' },
		{'caption': 'AWAJI ISLAND 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/21.jpg', 'src': 'assets/img/photos/21.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/34.jpg', 'src': 'assets/img/photos/34.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/35.jpg', 'src': 'assets/img/photos/35.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/36.jpg', 'src': 'assets/img/photos/36.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/37.jpg', 'src': 'assets/img/photos/37.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/38.jpg', 'src': 'assets/img/photos/38.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/39.jpg', 'src': 'assets/img/photos/39.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/40.jpg', 'src': 'assets/img/photos/40.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/41.jpg', 'src': 'assets/img/photos/41.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/42.jpg', 'src': 'assets/img/photos/42.jpg' },
		{'caption': 'KYOTO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/43.jpg', 'src': 'assets/img/photos/43.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/22.jpg', 'src': 'assets/img/photos/22.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/23.jpg', 'src': 'assets/img/photos/23.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/24.jpg', 'src': 'assets/img/photos/24.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/25.jpg', 'src': 'assets/img/photos/25.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/26.jpg', 'src': 'assets/img/photos/26.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/27.jpg', 'src': 'assets/img/photos/27.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/28.jpg', 'src': 'assets/img/photos/28.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/29.jpg', 'src': 'assets/img/photos/29.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/30.jpg', 'src': 'assets/img/photos/30.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/31.jpg', 'src': 'assets/img/photos/31.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/32.jpg', 'src': 'assets/img/photos/32.jpg' },
		{'caption': 'TOKYO 2017 JAPAN TRIP.', 'thumb': 'assets/img/thumbnails/33.jpg', 'src': 'assets/img/photos/33.jpg' },
		{'caption': 'NANJING - 2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/2017-07-18-nanjing1.jpg', 'src': 'assets/img/photos/2017-07-18-nanjing1.jpg' },
		{'caption': 'SUZHOU - 2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/2017-06-18-suzhou1.jpg', 'src': 'assets/img/photos/2017-06-18-suzhou1.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/10.jpg', 'src': 'assets/img/photos/10.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/11.jpg', 'src': 'assets/img/photos/11.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/12.jpg', 'src': 'assets/img/photos/12.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/13.jpg', 'src': 'assets/img/photos/13.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/14.jpg', 'src': 'assets/img/photos/14.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/15.jpg', 'src': 'assets/img/photos/15.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/16.jpg', 'src': 'assets/img/photos/16.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/17.jpg', 'src': 'assets/img/photos/17.jpg' },
		{'caption': '2017 VOLUNTEERING IN CHINA TRIP.', 'thumb': 'assets/img/thumbnails/18.jpg', 'src': 'assets/img/photos/18.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/1.jpg', 'src': 'assets/img/photos/1.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/2.jpg', 'src': 'assets/img/photos/2.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/3.jpg', 'src': 'assets/img/photos/3.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/4.jpg', 'src': 'assets/img/photos/4.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/5.jpg', 'src': 'assets/img/photos/5.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/6.jpg', 'src': 'assets/img/photos/6.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/7.jpg', 'src': 'assets/img/photos/7.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/8.jpg', 'src': 'assets/img/photos/8.jpg' },
		{'caption': '2016 hunting trip with friends.', 'thumb': 'assets/img/thumbnails/9.jpg', 'src': 'assets/img/photos/9.jpg' },
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
      const thumb = this.albumsList[i].thumb;
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
