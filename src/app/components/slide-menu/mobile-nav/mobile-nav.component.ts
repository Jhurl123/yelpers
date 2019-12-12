import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/services/authentication.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<{toggle: boolean}>();

  loggedIn: boolean = false;
  returnUrl: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {

    if (this.authService.currentUserValue) {
      this.loggedIn = this.authService.loggedIn;
    }

    this.checkLoginStatus();

    // Allow route to be set oninit,
    // will set to '/' if done without subscription
    this.router.events.subscribe(
      () => {
        this.returnUrl = "";
        this.returnUrl = this.router.url;
      });

  }

  ngOnChanges() {
    this.checkLoginStatus();
  }

  // Determing if user is logged in to toggle button display
  checkLoginStatus() {
    this.authService.isLoggedIn.subscribe((result) => {
      this.loggedIn = !this.loggedIn;
    });
  }

  closeMenuClick() {
    this.closeMenu.emit();
  }

  logout() {

    this.authService.logout();
    this.loggedIn = this.authService.loggedIn;
    this.router.navigate(['/']);

}

}
