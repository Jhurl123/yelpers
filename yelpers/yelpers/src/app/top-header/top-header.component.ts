import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  mobileSize: boolean = false;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      if( window.innerWidth >= 768 ) {
        this.mobileSize = false;
      }
      else {
        this.mobileSize = true;
      }
    }

  constructor() { }

  ngOnInit() {
    console.log(window);
  }

}
