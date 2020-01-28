import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(control: AbstractControl) {

  if (control.get('password').value !== control.get('confirmPassword').value) {
    control.get('confirmPassword').setErrors({passwordMatch: true})
  }
  else {
    control.get('confirmPassword').setErrors(null);
  }

  return null

}
