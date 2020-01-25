 import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

import { YelpService } from '@/services/yelp.service';

import { Lightbox } from 'ngx-lightbox';

import { Business } from '@/models/business/busines.model';
import { Review } from '@/models/review/review.model';

@Component({
  selector: 'app-single-business',
  templateUrl: './single-business.component.html',
  styleUrls: ['./single-business.component.scss']
})
export class SingleBusinessComponent implements OnInit {

  business: Business;
  reviews: Review[];
  imgArray = [];
  album: Array<{}> = [];
  hours: Array<{}> = [];

  // Review Notes for api key
  apiUrl: string = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyA-O-hGRxxv9Hli_zGc4OqzaiCFYT0f1d8&q=';

  weekDays:  Array<{}> = [
    { day: 0, day_name: 'Sun.', closed: false },
    { day: 1, day_name: 'Mon.', closed: false },
    { day: 2, day_name: 'Tue.', closed: false },
    { day: 3, day_name: 'Wed.', closed: false },
    { day: 4, day_name: 'Thu.', closed: false },
    { day: 5, day_name: 'Fri.', closed: false },
    { day: 6, day_name: 'Sat.', closed: false },
  ];

  constructor(
    private yelpService: YelpService,
    private route: ActivatedRoute,
    private lightbox: Lightbox,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.setBusiness(params.get("id"));
    });

  }

  setBusiness(id) {

    // Set photos for slideshow and modal
    this.yelpService.getSingle(id).subscribe((result: Business) => {

      if(result.hasOwnProperty('hours')) {
        result.hours[0].open.forEach((day) => {

          day.start    = this.convert24Hours(day.start)
          day.end      = this.convert24Hours(day.end)
          day.day_name = this.weekDays[day.day]['day_name'];

          this.hours.push(day)
        });

      }
      else {
        this.hours = null;
      }

      if(result.hasOwnProperty('photos')) {
        this.imgArray =  this.formatSlideshow(result.photos);
      }



      if(result.hasOwnProperty('location')) {
          let mapLocation = this.apiUrl.concat(this.formatLocation(result.location.display_address));
          result['map_location'] = this.sanitizer.bypassSecurityTrustResourceUrl(mapLocation);
      }

      // Get Reviews
      this.yelpService.getReviews(id, result.url).subscribe((result) => {
        this.reviews = result['reviews'];

      });
      this.business = result;
    });


  }

  // Format photos to be usable by slideshow
  formatSlideshow(photos) {

    if(photos.length === 0) {
      let photo = '../../../assets/images/image-placeholder.jpg';
      return ([{
        url: photo,
        src: photo
      }])
    }

    let modalArray: any[] = [];
    modalArray = photos.map( (photo, index) => {
      return ({
          url: photo,
          src: photo,
          thumb: photo,
          clickAction: ()=> this.popModal(index)
      })
    });

    return modalArray;

  }

  // Open modal on click of image
  popModal(index: number) {
    this.lightbox.open(this.imgArray, index);
  }

  convert24Hours(time) {

    time = [time.slice(0, 2), ':', time.slice(2)].join('');
    const timeString12hr = new Date('1970-01-01T' + time + 'Z')
    .toLocaleTimeString(undefined,
      {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
    );

    return timeString12hr
  }

  // Formats address for Google Maps API query string
  // Params: location Array
  formatLocation(location) {
    let queryString: string = '';
    location.forEach( location => {
      queryString += location.replace(/ /g, '+') + ",";
    })

    return queryString;
  }
}
