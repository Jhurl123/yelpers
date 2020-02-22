import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { confirmPasswordValidator } from '@/validators/confirmPassword.validator';
import { passwordFormatValidator } from '@/validators/formatPassword.validator';

import { UserService} from '@/services/user.service';
import { AuthenticationService } from '@/services/authentication.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    alertText: string;
    alertType: string;
    today: string;
    datePickerConfig: any = {
        format: 'MM-DD-YYYY',
        maxDate: this.today
    };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }

        this.formatTodaysDate();

    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            emailAddress: ['', [Validators.required, Validators.email]],
            birthDate: '',
            passwords: this.formBuilder.group({
              password: ['', [Validators.required, Validators.minLength(6)]],
              confirmPassword: ['', [Validators.required]],
          }, {validator: [confirmPasswordValidator, passwordFormatValidator] }),
        });
        console.log(this.today);
    }

    get f() { return this.registerForm.controls; }
    get passwords() { return this.registerForm.get('passwords') as FormGroup; }

    formatTodaysDate() {

        const date = new Date();

        // One day removed from the date so that the maxDate for
        // date picker will be today,
        let dd = date.getDate() -1,
            mm = date.getMonth() + 1,
            yyyy = date.getFullYear(),
            fdd = '',
            fmm = '';

        if (dd < 10) {
          fdd = '0' + dd;
        }
        else {
          fdd = dd.toString();
        }

        if (mm < 10) {
          fmm = '0' + mm;
          console.log(fmm);
        }
        else {
          fmm = mm.toString();
        }

        this.today = fmm + '/' + fdd + '/' + yyyy;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.registerUser(this.registerForm.value)
            .subscribe(
              data => {

                console.log(data);
                if(data) {

                  this.alertType = 'success';
                  this.alertText = "Account successfully created! Redirecting...."
                  setTimeout(() => {
                    this.router.navigate(['/login']);
                  }, 1500);
                }
                // This is here to stop buttonb from being disabled while testing user registration functionality
                this.loading = false;
              },
              error => {
                  this.alertType = 'fail';
                  this.alertText = error;
                  this.loading = false;
              }
            );
    }
}
