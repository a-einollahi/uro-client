import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  readFile(file) {
    const workBook = XLSX.readFile(file);
    const sheet_name_list = workBook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);
    
    
    // ['true-false', 'multi-section', 'multi-section-multi-answer', 'single-section', 'description' ]
    const question_type = [];
    const questions = []
    data.forEach((el, index) => {
      if (index === 0) question_type.push(...Object.keys(el));
      if (typeof(el['no'])==='number')
        questions.push(el);
    });

    return questions;
  }



  /* generate worksheet */
  // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

  /* generate workbook and add the worksheet */
  // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  // XLSX.writeFile(wb, 'SheetJS.xlsx');

}
