import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { confirmPasswordValidator } from '@/validators/confirmPassword.validator';

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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            emailAddress: ['', Validators.required],
            passwords: this.formBuilder.group({
              password: ['', [Validators.required, Validators.minLength(6)]],
              confirmPassword: ['', [Validators.required]],
          }, {validator: confirmPasswordValidator}),
        });
        console.log(this.loading);
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
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    alert("registration Successful");
                    this.router.navigate(['/login']);
                },
                error => {
                    alert(error);
                    this.loading = false;
                });
    }
}
