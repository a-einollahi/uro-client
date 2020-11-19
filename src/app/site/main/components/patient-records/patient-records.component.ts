import { MessageService, MessageType } from './../../../../shared/services/message.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as momentJs from 'jalali-moment';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from './../../../../shared/services/http.service';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.css']
})
export class PatientRecordsComponent implements OnInit, OnDestroy {
  patient_info = [];
  patients_name = [];
  questionnaires = [];

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required]),
    questionnaire: new FormControl('', [Validators.required]),
    search_by_date: new FormControl({value: null, disabled: true}),
    start_date: new FormControl({value: null, disabled: true}),
    end_date: new FormControl({value: null, disabled: true})
  });
  filteredOptions = [];
  patient_report = [];
  patient_record = [];
  patientSubscription: Subscription;
  checkSubscription: Subscription;
  constructor(private http: HttpService, private message: MessageService) { }

  ngOnInit(): void {
    this.patientSubscription = this.searchForm.get('search').valueChanges
      .subscribe(data => {
        this.searchForm.get('questionnaire').disable();
        this.searchForm.get('search_by_date').disable();
        this.searchForm.get('start_date').disable();
        this.searchForm.get('end_date').disable();

        if (this.filteredOptions.find(x => x ==this.searchForm.get('search').value)) {
          this.loadQuestionnaireOfSelectedPatient();
        }
      });
    this.checkSubscription = this.searchForm.get('search_by_date').valueChanges
      .subscribe(data => {
        if (data) {
          this.searchForm.get('start_date').enable();
          this.searchForm.get('end_date').enable();
        } else {
          this.searchForm.get('start_date').disable();
          this.searchForm.get('end_date').disable();
        }
      });
    this.loadPatientsLists();
  }

  ngOnDestroy(): void {
    this.patientSubscription.unsubscribe();
    this.checkSubscription.unsubscribe();
  }

  loadPatientsLists() {
    this.http.get('patient', 'getPatientsOfUser', null).subscribe((data: any[]) => {
      this.patient_info = [...data];
      this.extractPatientsName(data);
    });
  }

  extractPatientsName(arr) {
    const names = [];
    arr.forEach(patient => {
      const name = patient['first_name'] ? [patient['first_name'], patient['last_name']].join(' ') : patient['last_name'];
      names.push((name + ` - ( ${patient.national_code} )`));
    });

    this.patients_name = names;
    this.filteredOptions = names;
  }

  loadQuestionnaireOfSelectedPatient() {
    const national_code = this.searchForm.value.search.split(' ').reverse()[1];
    const findOne = this.patient_info.find(x => x.national_code == national_code);

    this.questionnaires = [];
    if (findOne) {
      findOne.questionnaire.forEach(el => {
        this.questionnaires.push({id: el.id, title: el.title});
      });
      this.searchForm.get('questionnaire').enable()
      this.searchForm.get('search_by_date').enable();
    } else {
      this.searchForm.reset();
    }
  }

  loadPatientsReport() {
    if (this.searchDisability()) {
      return;
    }

    const national_code = this.searchForm.value.search.split(' ').reverse()[1];
    const findOne = this.patient_info.find(x => x.national_code == national_code);

    if (!findOne) {
      return;
    }

    this.http.get('patient', 'getPatientReport', {
      national_code,
      questionnaire_id: this.searchForm.value.questionnaire.id,
      search_by_date: this.searchForm.value.search_by_date,
      start_date: this.searchForm.value.start_date,
      end_date: this.searchForm.value.end_date,
    }).subscribe((data: any[]) => {
      if (data.length) {
        this.patient_record = data;
        return this.message.showMessage( 'اطلاعات با موفقیت بارگزاری شد.' , MessageType.Success);
      } else {
        this.patient_record = [];
        return this.message.showMessage( 'اطلاعاتی پیدا نشد.' , MessageType.Information);
      }

    });
  }

  filterValue() {
    const value = this.searchForm.value.search;

    if (!value || !value.trim()) {
      this.filteredOptions = this.patients_name;
    } else {
      this.loadQuestionnaireOfSelectedPatient();

      this.filteredOptions = this.patients_name.filter(el => el.includes(value));
    }
  }

  disableQuestionnaireSelection() {
    if (!this.searchForm.controls.search.valid) {
      return true;
    } else {
      const findOne = this.patients_name.find(x => x === this.searchForm.value.search);
      return !findOne;
    }
  }

  searchDisability() {
    if (!this.searchForm.valid) {
      return true;
    } else {
      const findOne = this.patients_name.find(x => x === this.searchForm.value.search);
      return !findOne;
    }
  }

}
