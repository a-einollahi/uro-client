import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from './../services/translator.service';

@Pipe({
  name: 'farsi'
})
export class FarsiPipe implements PipeTransform {

  constructor(private translate: TranslatorService) {}
  transform(value: string | number, src): unknown {
    return this.translate.toPersianNumber(value, src);
  }

}
