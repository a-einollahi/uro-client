import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './../../../../../shared/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-modification',
  templateUrl: './patient-modification.component.html',
  styleUrls: ['./patient-modification.component.css']
})
export class PatientModificationComponent implements OnInit {
  patient;
  isLoaded = false;
  form: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required])
  })
  constructor( private http: HttpService) { }

  ngOnInit(): void {
  }

  onSearchFilter() {
    this.http.get('patient', 'searchPatientWithNationalCode', {national_code: this.form.get('search').value}).subscribe(res => {
      this.patient = res;
      this.isLoaded = true;
    })
  }
}
