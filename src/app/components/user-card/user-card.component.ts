import { Component, OnInit, Input } from '@angular/core';

import { User } from '@/models/user/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input('user') User: User

  constructor() { }

  ngOnInit() {
  }

  // Info to include in the user card
  // First and last name
  // Email
  // Birth DAte (optional)
  // Join Date
  // Number of Reviews


}
