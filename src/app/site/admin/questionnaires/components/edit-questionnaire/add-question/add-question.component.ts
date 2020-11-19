import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http.service';
import { MessageService, MessageType } from 'src/app/shared/services/message.service';
import { QuestionType } from 'src/app/shared/enums/questioon-type.enum';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questionTypes = Object.entries(QuestionType);

  mode = '';
  occupiedNumber = [];
  multiSelection = [];

  constructor(public dialogRef: MatDialogRef<AddQuestionComponent>, private http: HttpService, private messageService: MessageService, @Inject(MAT_DIALOG_DATA) public data) {}

  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      questionnaireId: new FormControl(this.data.id),
      questionNumber: new FormControl(this.data.number),
      questionTitle: new FormControl(''),
      questionType: new FormControl(''),
      questionOptions: new FormControl(''),
      singleSelection: new FormControl(''),
    })
    this.mode = this.data.mode;
    this.occupiedNumber = this.data.occupiedNumber;
    if (this.mode === 'edit') {
      this.loadQuestion();
    }
  }

  loadQuestion() {
    this.http.get('questionnaire', 'getQuestion', this.data.questionId).subscribe(res => {
      this.form.patchValue({
        questionTitle: res['question_title'],
        questionType: res['question_type'],
        questionNumber: res['position'],
      })

      if (this.form.get('questionType').value === 'multi-section' || this.form.get('questionType').value === 'multi-section-multi-answer') {
        this.multiSelection = res['options'];
      }

    }, err => {
      console.error(err)
    })
  }

  addMultiSelectionOptions() {
    if (!this.form.get('singleSelection').value || this.multiSelection.length >= 8) {
      this.messageService.showMessage('multiSelection cannot be included more than 8 elements', MessageType.Warning);
    } else {
      this.multiSelection.push(this.form.get('singleSelection').value);
      this.form.get('singleSelection').setValue('');
    }
  }

  removeMultiSelectionItems(e) {
    this.multiSelection = this.multiSelection.filter(el => el !== e);
  }

  finalRegister() {
    if (this.form.get('questionType').value === 'multi-section' || this.form.get('questionType').value === 'multi-section-multi-answer') {
      this.form.get('questionOptions').setValue(this.multiSelection);
    } else {
      this.form.get('questionOptions').setValue(null);
    }

    if (this.mode === 'edit') {
      this.form.get('questionId').setValue(this.data.questionId);
      this.editQuestion();
    } else {
      this.addQuestion();
    }
  }

  addQuestion() {
    if (!this.form.get('questionNumber').value || this.occupiedNumber.find(x => x == this.form.get('questionNumber').value)) {
      this.form.get('questionNumber').setValue(Math.max(...this.occupiedNumber) + 1);
    }

    this.http.post('questionnaire', 'addNewQuestion', this.form.value)
      .subscribe(response => {
        this.dialogRef.close('question is added successfully');
      }, err => {
        console.log(err);
      });
  }

  editQuestion() {
    if (!this.form.get('questionNumber').value || this.occupiedNumber.find(x => x == this.form.get('questionNumber').value)) {
      this.form.get('questionNumber').setValue(Math.max(...this.occupiedNumber) + 1);
    }

    this.http.post('questionnaire', 'editQuestion', this.form.value)
      .subscribe(response => {
        this.dialogRef.close('question is added successfully');
      }, err => {
        console.log(err);
      });
  }

  addMultiSelectionDisablity() {
    return this.multiSelection.includes(this.form.get('singleSelection').value) || !this.form.get('singleSelection').value || this.multiSelection.length >= 8;
  }

  finalRegisterDisablity() {
    if (!this.form.get('questionTitle').value || !this.form.get('questionType').value) {
      return true;
    }

    if ((this.form.get('questionType').value === 'multi-section' || this.form.get('questionType').value === 'multi-section-multi-answer') && this.multiSelection.length < 2) {
      return true;
    }

    return false;
  }

  trlWord(word) {
    switch (word) {
      case 'true-false': return 'بله / خیر';
      case 'multi-section': return 'چند گزینه‌ای';
      case 'multi-section-multi-answer': return 'چند گزینه‌ای - چند جوابی';
      case 'single-section': return 'عبارت کوتاه';
      case 'description': return 'تشریحی';
      default: return word;
    }

    return word

  }
}
