import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewportSizingService } from '@/services/viewport-sizing/viewport-sizing.service';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent implements OnInit {

  @Input('openMenu') display: boolean = false;
  @Input('mobileSize') mobileSize: boolean = false;

  @Output() closeMenu = new EventEmitter<{toggle: boolean}>();


  constructor(private sizing: ViewportSizingService) {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.mobileSize === false) {
      this.display = false;
    }
  }
  closeSlideMenu() {
    this.closeMenu.emit({
      toggle: !this.display
    });
  }
}
