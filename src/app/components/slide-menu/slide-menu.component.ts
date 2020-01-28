import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { AuthenticationService } from '@/services/authentication.service';
import { DOCUMENT } from '@angular/common';

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
    private router: Router,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.mobileSize === false) {
      this.display = false;
    }

    if(this.display) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden')
    }
    else {
      this.renderer.setStyle(document.body, 'overflow', 'auto')
    }
  }
  closeSlideMenu() {
    this.closeMenu.emit({
      toggle: !this.display
    });
  }

}
