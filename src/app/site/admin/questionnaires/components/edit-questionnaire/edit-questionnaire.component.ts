import { HttpService } from './../../../../../shared/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddQuestionComponent } from './add-question/add-question.component';
import { YesNoDialogComponent } from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.scss']
})
export class EditQuestionnaireComponent implements OnInit {
  title;
  questionnaire;
  questions = [];

  dataSource;
  displayedColumns = ['delete', 'edit', 'position', 'type', 'title'];
  tableCounts = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private http: HttpService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loadQuestionnaireData();
  }

  loadQuestionnaireData() {
    let questionnaireId;
    this.route.paramMap.subscribe((params: ParamMap) => {
      questionnaireId = params.get('id');
      this.http.get('questionnaire', 'getQuestionnaireById', {id: questionnaireId}).subscribe(res => {
        this.title = res['questionnaire_title'];
        this.questionnaire = res;
        if (res['questions']) {
          this.questions = [...res['questions']];
          this.mapData(this.questions);
        }
      }, err => {
        if (err.error.message.startsWith('payload is not defined')) {
          this.returnToQuestionnairePage();
        } else {
          console.log(err);
        }
      });
    });
  }

  mapData(data) {
    if (!data || !data.length) {
      return;
    }

    const newData = [];
    this.tableCounts = data.length;
    data.forEach((el, index) => {
      const person = {
        id: el.id,
        position: el.position || index + 1,
        title: el.question_title,
        type: el.question_type
      };

      newData.push(person);
    });

    this.dataSource = new MatTableDataSource(newData);
    this.dataSource.paginator = this.paginator;
  }

  getOccupiedNumbers() {
    const numbersList = [];
    if (this.questions) {
      this.questions.forEach(el => {
        numbersList.push(el.position);
      });
    }

    return numbersList;
  }

  openAddQuestionDialog() {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        mode: 'add',
        id: this.questionnaire.id,
        occupiedNumber: this.getOccupiedNumbers(),
        number: this.tableCounts + 1
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'question is added successfully') {
        this.loadQuestionnaireData();
      }
    });
  }
  
  returnToQuestionnairePage() {
    return this.router.navigate(['/admin/questionnaires']);
  }

  editQuestionnaireTitle() {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        id: this.questionnaire.id,
        mode: 'input',
        title: 'عنوان جدید برای پرسشنامه را انتخاب نمایید.'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.toString().trim()) {
        this.http.post( 'questionnaire', 'editQuestionnaireTitle', {id: this.questionnaire.id, title: res}).subscribe(res => {
          
          this.loadQuestionnaireData();
        }, err => {
          console.error(err);
        });
      }
    });
  }

  deleteQuestionnaire() {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        id: this.questionnaire.id,
        title: 'آیا از حذف پرسشنامه مطمئن هستید؟'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.http.post( 'questionnaire', 'deleteQuestionnaire', {id: this.questionnaire.id}).subscribe(res => {
          this.returnToQuestionnairePage();
        }, err => {
          console.error(err);
        });
      }
    });
  }

  onDeleteQuestion(el) {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        id: el.id,
        title: 'آیا از حذف این سوال مطمئن می‌باشید؟'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.http.post('questionnaire', 'deleteQuestion', el.id).subscribe(res => {
          this.loadQuestionnaireData();          
        }, err => {
          console.error(err);
        });
      }
    });

  }

  onEditQuestion(el) {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        mode: 'edit',
        id: this.questionnaire.id,
        questionId: el.id,
        occupiedNumber: this.getOccupiedNumbers(),
        number: 0,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.loadQuestionnaireData();
    }, err => {
      console.error(err);
    });
  }

}
