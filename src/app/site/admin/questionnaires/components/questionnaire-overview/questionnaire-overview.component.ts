import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http.service';
import { RouterService } from './../../../../../shared/services/router.service';
import { QuestionChartComponent } from './question-chart/question-chart.component';

@Component({
  selector: 'app-questionnaire-overview',
  templateUrl: './questionnaire-overview.component.html',
  styleUrls: ['./questionnaire-overview.component.scss']
})
export class QuestionnaireOverviewComponent implements OnInit {

  title = '';
  questionnaire;
  questions;

  constructor(private http: HttpService, private route: ActivatedRoute, private router: RouterService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadQuestionnaireData();
  }

  loadQuestionnaireData() {
    let questionnaireId;
    this.route.paramMap.subscribe((params: ParamMap) => {
      questionnaireId = params.get('id');
      this.http.get('questionnaire', 'getQuestionnaireOverview', {id: questionnaireId}).subscribe(res => {
        this.title = res['questionnaire_title'];
        this.questionnaire = res;
        this.mapAnswers(res['questions']);
        this.questions = res['questions'];

      }, err => {
        if (err.error.message.startsWith('payload is not defined')) {
          this.returnToQuestionnairePage();
        } else {
          console.log(err);
        }
      });
    });
  }

  mapAnswers(questions) {
    questions.forEach(question => {

      if (question.question_type === 'true-false') {
        const _true = question.answers.filter(ans => ans.value === 'true');
        const _false = question.answers.filter(ans => ans.value === 'false');
        question['overview'] = [{option: 'true', value: _true.length}, {option: 'false', value: _false.length}];
      } else if (question.question_type === 'multi-section') {
        let answers = [];
        question['overview'] = [];
        question.options.forEach(option => {
          answers[option] = question.answers.filter(ans => ans.value === option);
          question['overview'].push({option, value: answers[option].length});
        });
      } else if (question.question_type === 'multi-section-multi-answer') {
        let answers = [];
        question['overview'] = [];
        question.options.forEach(option => {
          answers[option] = question.answers.filter(ans => ans.value.includes(option));
          question['overview'].push({option, value: answers[option].length});
        });
      } else {
        question['overview'] = [];
        question.answers.forEach(ans => {
          question['overview'].push(ans.value);
        });
      }

    });
  }

  onClickQuestionInfo(question) {
    this.dialog.open(QuestionChartComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        count: this.questionnaire.answer_sheets.length,
        question
      }
    });
  }

  createExcelReport() {
    this.http.get('report', 'getReport', {questionnaire_id: this.questionnaire.id}).subscribe(res => {
      console.log(res);
    })
  }

  returnToQuestionnairePage() {
    this.router.navigate('/admin/questionnaires');
  }
}
