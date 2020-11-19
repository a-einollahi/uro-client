import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslatorService } from './translator.service';

@Injectable()
export class MatPaginatorIntlPersianService extends MatPaginatorIntl {

  constructor(private translator: TranslatorService) {
    super()
  }

  itemsPerPageLabel = 'مورد در صفحه';
  nextPageLabel     = 'صفحه بعد';
  previousPageLabel = 'صفحه قبل';
  firstPageLabel    = 'صفحه اول';
  lastPageLabel     = 'صفحه آخر';

  getRangeLabel = (index, pageSize, total) => {
    if (total === 0 || pageSize === 0) return this.translator.toPersianNumber('0 مورد', null);

    return this.translator.toPersianNumber(` ${(index*pageSize)+1} تا ${(index+1)*pageSize<total?(index+1)*pageSize:total} از ${total} مورد`, null);
  }
}
