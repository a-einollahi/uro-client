import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from './../../../../shared/services/http.service';
import { MessageService, MessageType } from './../../../../shared/services/message.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer-sheet',
  templateUrl: './answer-sheet.component.html',
  styleUrls: ['./answer-sheet.component.css']
})
export class AnswerSheetComponent implements OnInit {
  loadPage = true;
  answerSheet;
  number_of_questions = 0;

  answerSheet_id;
  questionnaire_title;
  questions = <any>[];
  displayQuestion = <any>[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  anwsers = {}
  questionForm: FormGroup = new FormGroup({});
  questionFormSubscription: Subscription;
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router, private message: MessageService) {}

  ngOnInit(): void {
    this.questionFormSubscription = this.questionForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(data => {
        const key = Object.keys(data).find(k => data[k] != this.anwsers[k]);

        if (key) {
          let question = this.displayQuestion.find(x => x.position == key);
          this.createAnswer(question.id, this.questionForm.get(key.toString()).value);
        }
        this.anwsers = {...this.questionForm.value}
      })
    this.loadAnswerSheet();
  }

  loadAnswerSheet() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.answerSheet_id = params.get('id');
      this.http.get('answer', 'getAnswerSheet', {id: this.answerSheet_id}).subscribe(res => {
        this.answerSheet = res;
        this.number_of_questions = res['questionnaire']['questions'].length | 0;
        this.mapAnswerSheet(this.answerSheet);
        this.displayQuestions(0,5);
        this.loadPage = false;
      }, err => {
        this.message.showMessage('پرسشنامه ای پیدا نشد', MessageType.Warning);
        return this.router.navigate(['/user']);
      });
    });
  }

  mapAnswerSheet(data) {
    if (!data) {
      return;
    }
    this.questionnaire_title = data.questionnaire.questionnaire_title;
    this.questions = data.questionnaire.questions.sort(this.dynamicsort("position", "asc"));
    if (data.answers && data.answers.length) {
      this.questions.forEach(question => {
        const foundAnswer = data.answers.find(ans => ans.question_id === question.id);

        question['answer'] = foundAnswer ? foundAnswer.value : null;
      });
    }
    this.questions.forEach(q => {
      this.questionForm.addControl(q.position, new FormControl(q.answer))
    });
    this.anwsers = {...this.questionForm.value};
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

  closeSheet() {
    this.router.navigate(['/main']);
  }

  changePaginator(e) {
    const startIndex = (e.pageIndex * e.pageSize);

    this.displayQuestions(startIndex, e.pageSize);
  }

  displayQuestions(startIndex, pageSize) {
    this.displayQuestion = this.questions.filter(el => el.position > startIndex && el.position <= (startIndex + pageSize))
  }

  multiAnswer(question, e, option) {
    let opt = new Set();

    if (this.questionForm.get(question.position.toString()).value) {
      if (Array.isArray(this.questionForm.get(question.position.toString()).value)) {
        [...this.questionForm.get(question.position.toString()).value].forEach(el => {
          el ? opt.add(el) : null;
        })
      } else {
        opt.add(this.questionForm.get(question.position.toString()).value);
      }
    }

    if (e) {
      opt.add(option);
    } else {
      opt.delete(option);
    }
    this.questionForm.get(question.position.toString()).setValue([...opt]);
  }

  createAnswer(question_id, value) {
    this.http.post('answer', 'createAnswer', {answer_sheet_id: this.answerSheet_id,question_id,value})
      .subscribe(() => {
        this.message.showMessage('ثبت شد', MessageType.Information);
      });
  }

}
