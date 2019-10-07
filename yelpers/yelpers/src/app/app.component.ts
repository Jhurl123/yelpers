import { Component, HostListener } from '@angular/core';

import { ViewportSizingService } from '@/services/viewport-sizing/viewport-sizing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yelpers';

  mobileSize: boolean = false;
  openMenu: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobileSize = this.sizing.getWindowSize();
    if( !this.mobileSize ) {
      this.openMenu = false;
    }

  }

  constructor(private sizing: ViewportSizingService) {}

  ngOnInit() {
    this.mobileSize = this.sizing.getWindowSize();
  }

  toggleButton(event) {
    this.openMenu = !this.openMenu;
  }

}
