import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/modules/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { AnswerSheetComponent } from './components/answer-sheet/answer-sheet.component';
import { NewQuestionnaireComponent } from './components/new-questionnaire/new-questionnaire.component';
import { PatientRecordsComponent } from './components/patient-records/patient-records.component';
import { RecordsComponent } from './components/records/records.component';
import { AnswerInfoComponent } from './components/records/answer-info/answer-info.component';
import { AddPatientComponent } from './components/new-questionnaire/add-patient/add-patient.component';
import { SearchPatientComponent } from './components/new-questionnaire/search-patient/search-patient.component';
import { PatientInfoComponent } from './components/new-questionnaire/patient-info/patient-info.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { MessagesComponent } from './components/inbox/messages/messages.component';


@NgModule({
  declarations: [MainComponent, AnswerSheetComponent, NewQuestionnaireComponent, PatientRecordsComponent, RecordsComponent, AnswerInfoComponent, AddPatientComponent, SearchPatientComponent, PatientInfoComponent, InboxComponent, MessagesComponent],
  imports: [
    SharedModule,
    MainRoutingModule
  ],
  entryComponents: [AnswerInfoComponent]
})
export class MainModule { }