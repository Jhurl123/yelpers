 import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

import { YelpService } from '@/services/yelp.service';

import { Lightbox } from 'ngx-lightbox';

import { Business } from '@/models/business/busines.model';
import { Review } from '@/models/review/review.model';
import { UserReview } from '@/models/review/userReview.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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

      // Get Reviews
      this.yelpService.getReviews(id, result.url).subscribe((result) => {
        this.reviews = result['reviews'];

      });
      this.business = result;
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

    hours.forEach( day => {

      var schedule = day;

      // schedule.start           = schedule.start === '0000' ? 'Not Specified' : schedule.start;
      // schedule.end             = schedule.end === '0000' ? 'Not Specified' : schedule.end;

      if(schedule.start === "0000") {
        schedule.start = "Not Specified";
      }
      else {
        schedule['start_mod'] = schedule.start < 1200 ? 'am' : 'pm';
      }

      if(schedule.end === "0000") {
        schedule.end = "Not Specified"
      }
      else {
        schedule['end_mod'] = schedule.end < 1200 ? 'am' : 'pm';
      }

      for(let i = 0; i < this.weekDays.length; i ++ ) {
        let hours = this.weekDays;

        if(schedule.day === hours[i]['day']) {
          schedule['day_name'] = hours[i]['day_name']
          break;
        }
      }

      if(parseInt(schedule.end, 10) > 1200) {
        schedule['end'] = this.convertTime24to12(schedule.end);
      }
      else {
        schedule['end'] = schedule.end;
      }

      if(schedule.start[0] == 0) {
        schedule.start = this.addColon(schedule.start, 2);
      }
      else {
        schedule.start = this.addColon(schedule.start, 1);
      }

      if(schedule.end[0] == 0 && schedule.end !== "Not Specified") {

        schedule.end = this.addColon(schedule.end, 2);
      }
      else if(schedule.end !== "Not Specified") {

        schedule.end = this.addColon(schedule.end, 1);
      }

      schedule['start'] = schedule.start;

      // if(i === hours.length -1) {
      //   schedule['closed'] = true;
      // }

      this.hours.push(schedule);

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
    let hourString:string = '';
    if(hourNum < 10) {
      hourString = '0' + hourNum.toString();
    }
    else {
      hourString = hourNum.toString();
    }

    return `${hourString}${minutes}`;
  }

  addColon(start: string, index: number) {
    if( index === 2) {
      let formattedString = start.substring(1, start.length);

      start = formattedString[0] + ':' + formattedString.substring(1);
    }
    else {
      start = start.substring(0, 2) + ':' + start.substring(index + 1);
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

    return queryString;
  }


}
