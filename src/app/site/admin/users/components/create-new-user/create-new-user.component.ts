import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from './../../../../../shared/services/http.service';
import { MessageService, MessageType } from 'src/app/shared/services/message.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { Provinces } from 'src/app/shared/constants/provinces';
import { Cities } from 'src/app/shared/constants/cities';
import { Speciality } from './../../../../../shared/enums/speciality.enum';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit, OnDestroy {
  speciality = Object.keys(Speciality);

  form = new FormGroup({
    gender: new FormControl('male', [Validators.required, Validators.pattern(/male|female/)]),
    role: new FormControl('user', [Validators.required]),
    speciality: new FormControl(null, [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    medical_number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    state: new FormControl(null, Validators.required),
    city: new FormControl({value: null, disabled: true}, [Validators.required]),
    mobile: new FormControl([]),
    hospital: new FormControl(''),
    hospital_phone: new FormControl([]),
    hospital_address: new FormControl(''),
    office_phone: new FormControl([]),
    office_address: new FormControl(''),
    is_faculty: new FormControl(false),
    university: new FormControl(null),
    university_grade: new FormControl(null),
  });

  provinces = Provinces;
  cities = Cities;
  filteredCities = [];
  provincesSubscription: Subscription;
  constructor(private http: HttpService, private message: MessageService, private router: RouterService) { }

  ngOnInit(): void {
    this.provincesSubscription = this.form.get('state').valueChanges
    .subscribe(data => {
      this.form.get('city').setValue(null);
      this.filteredCities = [];
      let cities = this.cities.filter(c => c.state === data);

      if (cities) {
        this.filteredCities = cities[0]?.city;
        this.form.get('city').enable();
      } else {
        this.form.get('city').disable();
      }
    });
  }

  ngOnDestroy(): void {
    this.provincesSubscription.unsubscribe();
  }

  addMobilePhone(e) {
    this.form.get('mobile').setValue(e);
  }

  addHospitalPhone(e) {
    this.form.get('hospital_phone').setValue(e);
  }

  addOfficePhone(e) {
    this.form.get('office_phone').setValue(e);
  }

  register() {
    this.http.post('user', 'createNewUser', this.form.value).subscribe(res => {
      this.message.showMessage("کاربر جدید با موفقیت ایجاد شد.", MessageType.Warning);
      return this.router.navigate('/admin/users');
    });
  }

  trlSpeciality(value) {
    switch (value) {
      case 'urologist': return 'ارولوژیست';
      case 'rheumatologist': return 'رماتولوژیست';
      case 'oncologist': return 'آنکولوژیست';
    }
  }
}
