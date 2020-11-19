import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import * as XLSX from 'xlsx';
import { HttpService } from '../../../../../shared/services/http.service';
import { RouterService } from './../../../../../shared/services/router.service';
import { ExcelService } from '../../../../../shared/services/excel.service';
import { MessageService, MessageType } from '../../../../../shared/services/message.service';
import { QuestionType } from '../../../../../shared/enums/questioon-type.enum';

@Component({
  selector: 'app-create-new-questionnaire',
  templateUrl: './create-new-questionnaire.component.html',
  styleUrls: ['./create-new-questionnaire.component.scss']
})
export class CreateNewQuestionnaireComponent implements OnInit {
  arrayBuffer: any;
  file: File;

  addQuestionnaireForm: FormGroup;
  constructor(private http: HttpService, private router: RouterService, private excel: ExcelService, private message: MessageService) {
  }

  ngOnInit() {
    this.addQuestionnaireForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl(''),
      questions: new FormControl([], [Validators.required])
    });
  }

  onLoadFile(event) {    
    this.file = event.target.files[0];
    this.upload();
  }

  upload() {
    let fileReader: FileReader = new FileReader();

    fileReader.onload = e => {
      this.arrayBuffer = fileReader.result;
      let data = new Uint8Array(this.arrayBuffer);
      let arr = new Array();

      data.forEach((el, index) => { arr[index] = String.fromCharCode(el); });
      let bstr = arr.join('');
      let workbook = XLSX.read(bstr, {type: 'binary'});
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];

      this.extractExcelData(XLSX.utils.sheet_to_json(worksheet, {raw: true}));
    }

    fileReader.readAsArrayBuffer(this.file);
  }

  extractExcelData(data) {
    let questions_type = Object.values(data.filter((el, index) => index === 0)[0]);
    let questions = [...data.filter((el, index) => index > 0 && el && el.no)];
    
    questions.forEach(el => {
      switch (el.question_type) {
        case questions_type[0]:
          el.question_type = QuestionType.true_false;
        break;
        case questions_type[1]:
          el.question_type = QuestionType.multi_section;
        break;
        case questions_type[2]:
          el.question_type = QuestionType.multi_section_multi_answer;
        break;
        case questions_type[3]:
          el.question_type = QuestionType.single_section;
        break;
        case questions_type[4]:
          el.question_type = QuestionType.description;
        break;
      }
    });
    
    this.addQuestionnaireForm.patchValue({questions});
  }
  
  createNewQuestionnaire() {
    this.http.post('questionnaire', 'createNewQuestionnaire', this.addQuestionnaireForm.value).subscribe(() => {
      this.message.showMessage('پرسشنامه با موفقیت ایجاد شد.', MessageType.Success);
      return this.router.navigate('/admin/questionnaires');
    })
  }

}
