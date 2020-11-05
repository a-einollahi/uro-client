import { InputComponent } from './../input.component';
import { Directive, Self } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';
import { customPatternValidator } from '../../customPatternValidator';

@Directive({
  selector: '[mobile]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MobileDirective, multi: true }
  ]
})
export class MobileDirective implements Validators {

  constructor(@Self() input: InputComponent) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return customPatternValidator({pattern: /^09\d{9}$/, msg: 'some message'})(control);
  }

}
