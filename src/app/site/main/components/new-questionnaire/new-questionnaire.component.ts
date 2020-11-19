import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.css']
})
export class NewQuestionnaireComponent implements OnInit {
addPatientStatus: boolean = false;
  patientInfoStatus: boolean = false;
  patientInfo = {
    id: ' ',
    first_name: ' ',
    last_name: ' ',
    age: 0
  };
  constructor() { }

  ngOnInit(): void {
  }

  enableAddPatient() {
    this.addPatientStatus = true;
  }

  desableAddPatient(e) {    
    this.addPatientStatus = !e;
  }

  emitInformation(e) {
    if (!e) {
      this.patientInfoStatus = false;
      return;
    }
    
    this.addPatientStatus = false;
    this.patientInfo.id = e['id'];
    this.patientInfo.first_name = e['first_name'];
    this.patientInfo.last_name = e['last_name'];

    if (e['birthday']) {
      this.patientInfo.age = moment().diff(e['birthday'], 'years');
    }

    this.patientInfoStatus = true;
  }

}
