import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@/services/authentication.service';
import { UserService } from '@/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    alertType: string;
    alertText: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

  ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailAddress: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log(this.route.snapshot)

        if( this.returnUrl.indexOf('search-results')) {
          this.returnUrl = '/home';
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.f.emailAddress.value, this.f.password.value)
          .subscribe(
              data => {

                if(typeof data.response != 'undefined') {
                  this.alertType = 'failure';
                  this.alertText = data.message;
                }
                else {
                  this.router.navigate([this.returnUrl]);
                }
              },
              error => {
                  console.log(error);
                  this.loading = false;
              });
    }
}
