import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from './../services/translator.service';

@Pipe({
  name: 'farsi'
})
export class FarsiPipe implements PipeTransform {

  constructor(private translate: TranslatorService) {}
  transform(value: string | number, src): unknown {
    if (value == 'true') return 'بله';
    if (value == 'false') return 'خیر';
    return this.translate.toPersianNumber(value, src);
  }

}
