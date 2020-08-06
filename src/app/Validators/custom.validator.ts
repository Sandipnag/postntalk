import { FormGroup, FormControl } from '@angular/forms';

export function dropdownValidation(control: FormControl) {
    if (control.value === '0' || control.value === null) {
        return null;
    } else {
        return { isValidated: true };
    }
}
