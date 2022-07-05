import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(ControlName: string, matchingControlName: string){
    return (FormGroup: FormGroup) => {
        const control = FormGroup.controls[ControlName]
        const matchingControl = FormGroup.controls[matchingControlName]
        if(matchingControl.errors && !matchingControl.errors['confirmedValidator'] )
        {
            return
        }

            if(control.value !== matchingControl.value)
            {
                matchingControl.setErrors({confirmedValidator: true});
            }
            else{
                matchingControl.setErrors(null);
            }
        }  
}