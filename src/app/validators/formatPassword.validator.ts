import { AbstractControl } from '@angular/forms';

export function passwordFormatValidator(control: AbstractControl) {
  let password = control.get('password').value;
  const isUpperCase = (string) => /^[A-Z]*$/.test(password);

  for( let i = 0; i < password.length; i++) {
    const isUpperCase = (string) => /^[A-Z]*$/.test(password[i]);
     if(isUpperCase(password)) {
        control.get('password').setErrors(null);
        break;
     }
     else {
      control.get('password').setErrors({noUpper: true});
     }
  }


  if (password) {

    // control.get('confirmPassword').setErrors({passwordMatch: true})
    // return { passwordMatch: true };
  }
  return null;
}
