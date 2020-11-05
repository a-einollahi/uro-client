import { InputComponent } from './../input.component';
import { Directive, Self } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';
import { customPatternValidator } from '../../customPatternValidator';

@Directive({
  selector: '[email]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true }
  ]
})
export class EmailDirective implements Validators {

  constructor(@Self() input: InputComponent) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return customPatternValidator({pattern: /@/, msg: 'some message'})(control);
  }

}
