import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/modules/shared.module';
import { QuestionnairesRoutingModule } from './questionnaires-routing.module';
import { ChartsModule } from 'ng2-charts';

import { AddQuestionComponent } from './components/edit-questionnaire/add-question/add-question.component';
import { EditQuestionnaireComponent } from './components/edit-questionnaire/edit-questionnaire.component';
import { CreateNewQuestionnaireComponent } from './components/create-new-questionnaire/create-new-questionnaire.component';
import { QuestionnairesListComponent } from './components/questionnaires-list/questionnaires-list.component';
import { QuestionnaireOverviewComponent } from './components/questionnaire-overview/questionnaire-overview.component';
import { QuestionChartComponent } from './components/questionnaire-overview/question-chart/question-chart.component';

import { YesNoDialogComponent } from './../../../shared/components/yes-no-dialog/yes-no-dialog.component';


@NgModule({
  declarations: [QuestionnairesListComponent, CreateNewQuestionnaireComponent, EditQuestionnaireComponent, AddQuestionComponent, QuestionnaireOverviewComponent, QuestionChartComponent],
  imports: [
    SharedModule,
    QuestionnairesRoutingModule,
    ChartsModule
  ],
  entryComponents: [YesNoDialogComponent, AddQuestionComponent, QuestionChartComponent]
})
export class QuestionnairesModule { }
