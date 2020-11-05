import { InputComponent } from './../input.component';
import { Directive, Self } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';
import { customPatternValidator } from '../../customPatternValidator';

@Directive({
  selector: '[phone]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true }
  ]
})
export class PhoneDirective implements Validators {

  constructor(@Self() input: InputComponent) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return customPatternValidator({pattern: /^(0\d{2})([1-9]+\d{8})$/, msg: 'some message'})(control);
  }

}
