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

  apiUrl: string = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD95RlFOYq0f8dcwe92D9JvRsD0cJaEbfg&q=';

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

      console.log(result);

      if(result.hasOwnProperty('hours')) {
        this.formatHours(result.hours[0].open);
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

      this.business = result;
    });

    // Get Reviews
    this.yelpService.getReviews(id).subscribe((result: Review[]) => {
      this.reviews = result;
    });

  }

  // Format photos to be usable by slideshow
  formatSlideshow(photos) {

    let modalArray: any[] = [];
    photos.forEach( (photo, index) => {
      let slide = {
        url: photo,
        src: photo,
        thumb: photo,
        clickAction: ()=> { this.popModal(index)}
      }

      modalArray.push(slide)
    });

    return modalArray;

  }

  // Open modal on click of image
  popModal(index: number) {
    this.lightbox.open(this.imgArray, index);
  }

  // Format hour response
  formatHours(hours) {

    console.log(hours);
    this.weekDays.forEach( day => {

      var newSchedule = day;
      for( let i = 0; i < hours.length; i++ ) {
        let schedule = hours[i];

        newSchedule['start_mod'] = schedule.start < 1200 ? 'am' : 'pm';
        newSchedule['end_mod']   = schedule.end < 1200 ? 'am' : 'pm';

        if(schedule.day === day['day']) {
          newSchedule['day_name'] = day['day_name'];

          if(parseInt(schedule.end, 10) > 1200) {
            newSchedule['end'] = this.convertTime24to12(schedule.end);
          }

          if(schedule.start[0] == 0) {
            schedule.start = this.addColon(schedule.start, 2);

          }

          newSchedule['start'] = schedule.start;
          break;
        }
        if(i === hours.length -1) {
          newSchedule['closed'] = true;
        }
      }

      this.hours.push(newSchedule);

    });

  }

  convertTime24to12(time12h: string) {
    const time = time12h;

    let hours = time.substr(0,2);
    let minutes = time.substr(2,3);

    let hourNum: number = parseInt(hours, 10);

    if (hours === '12') {
      hours = '00';
    }

    hourNum -= 12;
    return `${hourNum}:${minutes}`;
  }

  addColon(start: string, index: number) {
    if( index === 2) {
      let formattedString = start.substring(1, start.length);
      start = formattedString[0] + ':' + formattedString.substring(1);
    }
    else {

      start = start.substring(0, 1) + ':' + start.substring(index +1);
    }

      return start;
  }

  // Formats address for Google Maps API query string
  // Params: location Array
  formatLocation(location) {

    let queryString: string = '';
    location.forEach( location => {
      queryString += location.replace(/ /g, '+') + ",";
    })
    console.log(queryString)

    return queryString;
  }


}
