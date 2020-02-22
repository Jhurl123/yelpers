import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '@/services/authentication.service';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss']
})
export class HeroImageComponent implements OnInit {

  @Input() imageUrl: string;
  signedIn: boolean = false;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(result => {

      this.signedIn = result ? true : false;

    })
  }

  ngOnInit() {
  }

}
