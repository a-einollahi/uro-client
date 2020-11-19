import { InputComponent } from './../input.component';
import { Directive, Self } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';
import { customPatternValidator } from '../../customPatternValidator';

@Directive({
  selector: '[nationalcode]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NationalcodeDirective, multi: true }
  ]
})
export class NationalcodeDirective implements Validators {

  constructor(@Self() input: InputComponent) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return customPatternValidator({pattern: /^\d{10}$/, msg: 'کدملی 10 رقمی باید با حروف انگلیسی نوشته شود.'})(control);
  }

}
