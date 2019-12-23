import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(control: AbstractControl) {
  console.log(control);
  if (control.get('password').value !== control.get('confirmPassword').value) {
    console.log("This is false");
    control.get('confirmPassword').setErrors({passwordMatch: true})
    return { passwordMatch: true };
  }
  return null;
}
