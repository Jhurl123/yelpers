import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '@/services/user.service';

import { User } from '@/models/user/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  user: any

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    let { id } = JSON.parse(localStorage.getItem('currentUser'));
    this.getUser(id)
  }

  // Info to include in the user card
  // First and last name
  // Email
  // Birth DAte (optional)
  // Join Date
  // Number of Reviews

  getUser = (id) => {

    this.userService.getUser(id)
    .subscribe( result => {

      console.log(result)
      this.user = result;
    });
  }


}
