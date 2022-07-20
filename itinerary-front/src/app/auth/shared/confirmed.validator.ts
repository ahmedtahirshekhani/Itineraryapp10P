import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ConfirmedValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formControls: AbstractControl): ValidationErrors | null => {
        const control = formControls.get(controlName);
        const matchingControl = formControls.get(matchingControlName);
        if(matchingControl!.errors && !matchingControl!.errors['confirmedValidator']) {
            return null;
        }

        if(control!.value !== matchingControl!.value) {
            matchingControl!.setErrors({confirmedValidator: true});
            return {confirmedValidator: true};
        } else {
            matchingControl!.setErrors(null);
            return null;
        }
    }  
}