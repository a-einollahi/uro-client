import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import * as moment from 'moment';
import * as momentJs from 'jalali-moment';
import { Subscription } from 'rxjs';
import { Cities } from 'src/app/shared/constants/cities';
import { Provinces } from 'src/app/shared/constants/provinces';
import { HttpService } from 'src/app/shared/services/http.service';
import { MessageService, MessageType } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit, OnDestroy {
  provinces = Provinces;
  cities = Cities;
  filteredCities = [];

  addPatientForm: FormGroup;

  provincesSubscription: Subscription;

  constructor(private http: HttpService, private message: MessageService, private router: Router) { }

  @Input() patient;
  ngOnInit(): void {
    if (this.patient.state && this.patient.city)
      this.filteredCities = (this.cities.filter(c => c.state === this.patient.state))[0]?.city;

    this.addPatientForm = new FormGroup({
      national_code: new FormControl(this.patient.national_code, [Validators.required, Validators.pattern(/[0-9]{10}/)]),
      gender: new FormControl(this.patient.gender, [Validators.required]),
      first_name: new FormControl(this.patient.first_name, [Validators.required]),
      last_name: new FormControl(this.patient.last_name, [Validators.required]),
      state: new FormControl(this.patient.state),
      city: new FormControl({value: this.patient.city , disabled: false}),
      mobile: new FormControl(this.patient.mobile),
      birthday: new FormControl(momentJs(new Date(this.patient.birthday)))
    });

    this.addPatientForm.patchValue({city: this.patient.city})

    this.provincesSubscription = this.addPatientForm.get('state').valueChanges
      .subscribe(data => {
        this.addPatientForm.get('city').setValue(null);
        this.filteredCities = [];
        let cities = this.cities.filter(c => c.state === data);

        if (cities) {
          this.filteredCities = cities[0]?.city;
          this.addPatientForm.get('city').enable();
        } else {
          this.addPatientForm.get('city').disable();
        }
      });
  }

  ngOnDestroy(): void {
    this.provincesSubscription.unsubscribe();
  }

  addPhone(e) {
    this.addPatientForm.get('mobile').setValue(e);
  }

  editPatient() {
    if (!this.addPatientForm.valid || !momentJs(this.addPatientForm.value.birthday).isValid) {
      return;
    }

    this.http.post('patient', 'editPatient', {value: this.addPatientForm.value, id: this.patient.id}).subscribe(res => {
      this.message.showMessage('ثبت اطلاعات با موفقیت انجام شد', MessageType.Success);
      this.router.navigate(['/admin/patients'])
    });
  }
}
