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
  constructor( private http: HttpService) { }

  ngOnInit(): void {
  }


  onSearchFilter(filter) {
    filter = filter.trim().toLowerCase();

    if (!filter || isNaN(filter)) {
      return;
    }

    this.http.get('patient', 'searchPatientWithNationalCode', {national_code: filter}).subscribe(res => {
      this.patient = res;
      this.isLoaded = true;
    })
  }
}
