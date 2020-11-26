import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  person: object = {};
  userStates: string[] = ['کاربر فعال است', 'کاربر غیر فعال است'];
  userStatus: string = '';
  isLoaded: boolean = false;

  constructor(public dialogRef: MatDialogRef<UserDetailComponent>, private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.http.get('user', 'getUser', {id: this.data.id}).subscribe(res => {

      this.person['id'] = res['id'];
      this.person['name'] = res['person']['first_name'] ?
        [res['person']['first_name'], res['person']['last_name']].join(' ') : res['person']['last_name'];

      this.person['active'] = res['active'];
      this.userStatus = this.person['active'] ? this.userStates[0] : this.userStates[1];
      this.person['email'] = res['email'];
      this.person['role'] = res['role'];
      this.person['national_code'] = res['username'];

      this.person['speciality'] = res['person']['speciality'];
      this.person['mobile'] = (res['person']['mobile'] && res['person']['mobile'].length) ? res['person']['mobile'].join(' - ') : null;
      this.person['location'] = [res['person']['state'], '-', res['person']['city']].join(' ');
      this.person['hospital'] = res['person']['hospital'];
      this.person['hospital_phone'] = (res['person']['hospital_phone'] && res['person']['hospital_phone'].length) ? res['person']['hospital_phone'].join(' - ') : null;
      this.person['hospital_address'] = res['person']['hospital_address'];
      this.person['office_phone'] = (res['person']['office_phone'] && res['person']['office_phone'].length) ? res['person']['office_phone'].join(' - ') : null;
      this.person['office_address'] = res['person']['office_address'];

      if (res['person']['is_faculty']) {
        this.person['university'] = res['person']['university'];
        this.person['university_grade'] = res['person']['university_grade'];
      }

      this.isLoaded = true;
    });
  }

  editUserPassword() {
    this.dialogRef.close(this.data.id);
  }

  changeUserActiveness(e) {
    this.http.post('user', 'changeUserActiveness', {id: this.person['id'], status: e.checked}).subscribe(res => {
      this.userStatus = this.userStates.filter(el => el !== this.userStatus).toString();
    });
  }
}
