import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@/services/authentication.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  @Input('mobileSize') display: boolean = false;

  @Output() toggleMenu = new EventEmitter<{toggle: boolean}>();

  toggle:boolean = false;
  loggedIn: boolean = false;
  returnUrl: any;


  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.loggedIn = this.authService.loggedIn;
    }

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
    // TODO This must be refactore dto something more intelligent
    this.authService.currentUser.subscribe((result) => {

      if(result) {
        this.loggedIn = !this.loggedIn;
      }
    });
  }

  toggleSlideMenu(event) {

    this.toggleMenu.emit({
      toggle: !this.toggle
    });

  }

  logout() {

    this.authService.logout();
    this.loggedIn = this.authService.loggedIn;
    this.router.navigate(['/']);

  }

}