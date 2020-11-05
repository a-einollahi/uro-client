import { invalid } from '@angular/compiler/src/render3/view/util';
import { FormControl, ValidatorFn } from '@angular/forms';

export function customPatternValidator(config: any): ValidatorFn {
  return (control: FormControl) => {
    let urlRegExp: RegExp = config.pattern;

    if (control.value && !control.value.match(urlRegExp)) return {invalidMsg: config.msg}
    else return null;
  }
}