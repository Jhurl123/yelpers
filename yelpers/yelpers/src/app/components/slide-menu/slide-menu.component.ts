import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '@/services/authentication.service';

import { ViewportSizingService } from '@/services/viewport-sizing/viewport-sizing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent implements OnInit {

  @Input('openMenu') display: boolean = false;
  @Input('mobileSize') mobileSize: boolean = false;
  @Output() closeMenu = new EventEmitter<{toggle: boolean}>();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
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
