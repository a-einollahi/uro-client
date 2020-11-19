import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from './../../../../../shared/services/http.service';
import { MessageService, MessageType } from './../../../../../shared/services/message.service';

interface Patient {
  national_code: string,
  gender: boolean,
  first_name: string,
  last_name: string,
  age: string,
  state: string,
  city
}

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  @Input() patient_information = {
    id: null,
    first_name: ' ',
    last_name: ' ',
    age: null
  };
  patientForm = new FormGroup({
    patient_id: new FormControl(null, [Validators.required]),
    questionnaire_id: new FormControl(null, [Validators.required])
  });
  questionnaires = <any>[];

  constructor( private http: HttpService, private router: Router, private message: MessageService) { }

  ngOnInit(): void {
    this.loadQuestionnaires();
  }

  loadQuestionnaires() {
    this.http.get('questionnaire', 'getAllQuestionnaire', null).subscribe(res => {
      this.questionnaires = res;
    })
  }

  createNewAnswerSheet() {
    this.patientForm.value.patient_id = this.patient_information.id;

    this.http.post('answer', 'createAnswerSheet', this.patientForm.value).subscribe(res => {
      if (res) {
        this.message.showMessage('The new questionnaire sheet is added successfully', MessageType.Success);
        this.router.navigate(['/main/questionnaire/', res['id']]);
      }
    });
  }

}
