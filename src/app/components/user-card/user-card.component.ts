import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormArray, FormGroup, Validators, NgForm} from '@angular/forms';

import { UserService } from '@/services/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  user: any
  infoForm: FormGroup
  nameControls: any
  emailControls: any

  constructor(
    private userService: UserService,
    private modalService: NgxSmartModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    // Get the number of reviews by user.
    // Best to use a count sql query
    // Hit a custom route
    // Build service, then build function in node

    let { id } = JSON.parse(localStorage.getItem('currentUser'));
    this.getUser(id);

    this.infoForm = this.formBuilder.group({});
  }

  getUser = (id) => {

    this.userService.getUser(id)
    .subscribe( result => {

      this.user = result;
    });

    this.userService.getNumReviews(id).subscribe(result =>  {

        this.user.numReviews = result

    });
  }

  openModal(field) {
    this.nameControls = {
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required]
    }

    this.emailControls = {
      email: [this.user.email, [Validators.required, Validators.email]]
    }

    let fieldGroup = (field === 'name') ? this.nameControls : this.emailControls;

    this.infoForm = this.formBuilder.group(fieldGroup);

    this.modalService.open('myModal');
  }

  modalSubmit() {

    let userObject = {...this.infoForm.value};
    userObject['id'] = this.user.id;

    this.userService.editUser(userObject)
    .subscribe( result => {
      Object.assign(this.user, this.infoForm.value)
      // Close the modal
      this.modalService.close('myModal');

    },(err) => {


    })
  }


}
