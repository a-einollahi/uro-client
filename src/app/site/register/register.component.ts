import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs'
import { AuthService } from './../../shared/services/auth.service';
import { MessageService, MessageType } from 'src/app/shared/services/message.service';
import { RouterService } from 'src/app/shared/services/router.service';

import { Provinces } from './../../shared/constants/provinces';
import { Cities } from './../../shared/constants/cities';
import { Speciality } from 'src/app/shared/enums/speciality.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  is_faculty: boolean = false;
  speciality = Object.keys(Speciality);

  provinces = Provinces;
  cities = Cities;
  filteredCities = [];

  registerForm: FormGroup
  provincesSubscription: Subscription;
  
  constructor(private auth: AuthService, private message: MessageService, private fb:FormBuilder, private router: RouterService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      user_info: new FormGroup({
        gender: new FormControl('male', [Validators.required, Validators.pattern(/male|female/)]),
        speciality: new FormControl(null, [Validators.required]),
        username: new FormControl('0010020034', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
        email: new FormControl('a@b.com', [Validators.required, Validators.email]),
        first_name: new FormControl('ali', [Validators.required]),
        last_name: new FormControl('reza', [Validators.required]),
        password: new FormControl('123', [Validators.required]),
        repeatedPassword: new FormControl('123', [Validators.required, this.confirmPasswordValidation]),
      }),
      personal_info: new FormGroup({
        medical_number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        state: new FormControl(null, Validators.required),
        city: new FormControl({value: null, disabled: true}, [Validators.required]),
        mobile: new FormControl([]),
        hospital: new FormControl(''),
        hospital_phone: new FormControl([]),
        hospital_address: new FormControl(''),
        office_phone: new FormControl([]),
        office_address: new FormControl(''),
      }),
      university_info: new FormGroup({
        is_faculty: new FormControl(false),
        university: new FormControl({value: null, disabled: !this.is_faculty}, [Validators.required]),
        university_grade: new FormControl({value: null, disabled: !this.is_faculty}, [Validators.required]),
      })

    });
    this.provincesSubscription = this.registerForm.get('personal_info.state').valueChanges
      .subscribe(data => {
        this.registerForm.get('personal_info.city').setValue(null);
        this.filteredCities = [];
        let cities = this.cities.filter(c => c.state === data);
        
        if (cities) {
          this.filteredCities = cities[0]?.city;
          this.registerForm.get('personal_info.city').enable();
        } else {
          this.registerForm.get('personal_info.city').disable();
        }
      });
  }

  trlSpeciality(value) {
    switch (value) {
      case 'urologist': return 'ارولوژیست';
      case 'rheumatologist': return 'رماتولوژیست';
      case 'oncologist': return 'آنکولوژیست';
    }
  }

  ngOnDestroy(): void {
    this.provincesSubscription.unsubscribe();
  }

  register(): void {    
    this.auth.register(this.registerForm.value)
      .subscribe(res => {
        if (res['user']['active'] === null) {
          this.message.showMessage("لطفا منتظر باشید تا اکانت شما فعال شود", MessageType.Warning);
          this.auth.logout();
          return this.router.navigate('');
        } else if (res['user']['active'] === false) {
          this.message.showMessage("درحال حاضر این اکانت فعال نمی‌باشد", MessageType.Warning);
          this.auth.logout();
          return this.router.navigate('');
        }
        this.router.navigate('');
      });
  }

  addMobilePhone(e) {
    this.registerForm.get('personalInfo.mobile').setValue(e);
  }
  
  addHospitalPhone(e) {
    this.registerForm.get('personalInfo.hospital_phone').setValue(e);
  }
  
  addOfficePhone(e) {
    this.registerForm.get('personalInfo.office_phone').setValue(e);
  }

  confirmPasswordValidation(control: FormControl): ValidationErrors {
    let password = control.root.get('userInfo.password');

    return password && control.value !== password.value ? {
      confirmPassword: true
    } : null;
  }

  onInput() {
    this.is_faculty = !this.is_faculty;
    if (this.is_faculty) {
      this.registerForm.get('university_info.university').enable();
      this.registerForm.get('university_info.university_grade').enable();
    } else {
      this.registerForm.get('university_info.university').disable();
      this.registerForm.get('university_info.university_grade').disable();
    }

  }
}
