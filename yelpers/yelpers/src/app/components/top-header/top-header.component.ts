import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { ViewportSizingService } from "@/services/viewport-sizing/viewport-sizing.service";
import { AuthenticationService } from '@/services/authentication.service';
` `
@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  @Input('mobileSize') display: boolean = false;

  @Output() toggleMenu = new EventEmitter<{toggle: boolean}>();

  toggle:boolean = false;


  constructor(
    private sizing: ViewportSizingService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  toggleSlideMenu(event) {

    this.toggleMenu.emit({
      toggle: !this.toggle
    });


  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}

}
