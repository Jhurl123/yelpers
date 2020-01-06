import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
    datePickerConfig: any = {
        format: 'DD-MM-YYYY'
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
    }

    get f() { return this.registerForm.controls; }
    get passwords() { return this.registerForm.get('passwords') as FormGroup; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.registerUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {

                  console.log(data)

                  if(data) {

                    alert("Registration Successful");
                    this.router.navigate(['/login']);
                  }
                  else {
                    alert("That email already exists");
                  }
                    // This is here to stop buttonb from being disabled while testing user registration functionality
                    this.loading = false;
                },
                error => {
                    alert(error);
                    this.loading = false;
                });
    }
}
