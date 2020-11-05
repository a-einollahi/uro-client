import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlPersianService extends MatPaginatorIntl {
  itemsPerPageLabel = 'مورد در صفحه';
  nextPageLabel     = 'صفحه بعد';
  previousPageLabel = 'صفحه قبل';
  firstPageLabel    = 'صفحه اول';
  lastPageLabel     = 'صفحه آخر';

  getRangeLabel = (index, pageSize, total) => {
    if (total === 0 || pageSize === 0) return '0 مورد';

    return ` ${(index*pageSize)+1} تا ${(index+1)*pageSize<total?(index+1):total} از ${total} مورد`
  }
}
