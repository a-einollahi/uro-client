import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionnairesListComponent } from './components/questionnaires-list/questionnaires-list.component';
import { CreateNewQuestionnaireComponent } from './components/create-new-questionnaire/create-new-questionnaire.component';
import { EditQuestionnaireComponent } from './components/edit-questionnaire/edit-questionnaire.component';
import { QuestionnaireOverviewComponent } from './components/questionnaire-overview/questionnaire-overview.component';


const routes: Routes = [
  {path: '', component: QuestionnairesListComponent},
  {path: 'new_questionnaire', component: CreateNewQuestionnaireComponent},
  {path: 'edit/:id', component: EditQuestionnaireComponent},
  {path: 'overview/:id', component: QuestionnaireOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnairesRoutingModule { }
