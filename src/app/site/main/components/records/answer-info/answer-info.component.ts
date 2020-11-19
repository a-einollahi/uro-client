import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-answer-info',
  templateUrl: './answer-info.component.html',
  styleUrls: ['./answer-info.component.scss']
})
export class AnswerInfoComponent implements OnInit {
  answerSheet;
  number_of_questions = 0;

  answerSheet_id;
  questionnaire_title;
  questions = <any>[];
  displayQuestion = <any>[];

  constructor(public dialogRef: MatDialogRef<AnswerInfoComponent>, private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.loadAnswerSheet();
  }

  loadAnswerSheet() {
    this.http.get('answer', 'getAnswerSheet', {id: this.data.id}).subscribe(res => {
      this.mapAnswerSheet(res);
    })
  }

  mapAnswerSheet(data) {
    if (!data) {
      return;
    }

    this.questionnaire_title = data.questionnaire.questionnaire_title;
    this.questions = data.questionnaire.questions.sort(this.dynamicsort('position', 'asc'));
    if (data.answers && data.answers.length) {
      this.questions.forEach(question => {
        const foundAnswer = data.answers.find(ans => ans.question_id === question.id);
        question['answer'] = foundAnswer ? foundAnswer.value : null;
      });
    }
  }

  dynamicsort(property,order) {
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b) {
        // a should come before b in the sorted order
        if (a[property] < b[property]) {
          return -1 * sort_order;
        // a should come after b in the sorted order
        } else if(a[property] > b[property]) {
          return 1 * sort_order;
        // a and b are the same
        } else {
          return 0 * sort_order;
        }
    }
  }

}
