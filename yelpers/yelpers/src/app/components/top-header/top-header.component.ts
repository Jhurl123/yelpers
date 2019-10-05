import { Component, OnInit, HostListener } from '@angular/core';

import { ViewportSizingService } from "@/services/viewport-sizing/viewport-sizing.service";

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  mobileSize: boolean = false;
  slideMenu: boolean = false;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
     this.sizing.getWindowSize();
    }

  constructor(private sizing: ViewportSizingService) { }

  ngOnInit() {
    this.sizing.getWindowSize();
  }

  toggleSlideMenu(event) {
    this.slideMenu = !this.slideMenu;
  }

}
