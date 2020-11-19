import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Provinces } from 'src/app/shared/constants/provinces';
import { Cities } from 'src/app/shared/constants/cities';
import { HttpService } from './../../../../../shared/services/http.service';
import { MessageService, MessageType } from './../../../../../shared/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  provinces = Provinces;
  cities = Cities;
  filteredCities = [];

  addPatientForm: FormGroup = new FormGroup({
    national_code: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl({value: null, disabled: true}, [Validators.required]),
    mobile: new FormControl([], [Validators.required])
  });

  provincesSubscription: Subscription;

  constructor(private http: HttpService, private message: MessageService) { }

  ngOnInit(): void {
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

  @Output() visibility = new EventEmitter<boolean>();
  desableAddPatient() {
    this.visibility.emit(true);
  }

  addPhone(e) {
    this.addPatientForm.get('mobile').setValue(e);
  }

  @Output() info = new EventEmitter<any>();
  createNewPatient() {

    this.addPatientForm.get('birthday').setValue(moment(this.addPatientForm.get('birthday').value).format('YYYY/MM/DD'));
    this.http.post('patient', 'addNewPatient', this.addPatientForm.value).subscribe(res => {
      this.message.showMessage('دریافت اطلاعات با موفقیت انجام شد', MessageType.Success);
      this.addPatientForm.reset();
      this.info.emit(res);
    });
  }
}
