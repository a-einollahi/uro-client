import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as momentJs from 'moment';
import { HttpService } from './../../../../../shared/services/http.service';
import { MessageService, MessageType } from './../../../../../shared/services/message.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss']
})
export class SearchPatientComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    patient: new FormControl('')
  });

  constructor(private http: HttpService, private message: MessageService) { }

  ngOnInit(): void {
  }

  @Output() info = new EventEmitter<any>();

  search() {
    if (!this.searchForm.value.search && !this.searchForm.value.patient) {
      return;
    }

    this.http.get('patient', 'searchPatient', {
      national_code: this.searchForm.value.search.trim(), last_name:this.searchForm.value.patient.trim()
    }).subscribe(res => {
      if (!res) {
        this.message.showMessage('اطلاعاتی یافت نشد', MessageType.Warning);
        this.info.emit(null);
      }
      else {
        this.message.showMessage('دریافت اطلاعات با موفقیت انجام شد', MessageType.Success);
        res['age'] = res['birthday'] ? momentJs(res['birthday']).fromNow().split(' hour ago')[0].split(' years ago')[0] : null;
        this.info.emit(res);
      }
    });
  }

  btnDisablity() {
    if (!this.searchForm.get('search').value.trim() && !this.searchForm.get('patient').value.trim()) return true;
    if (this.searchForm.get('search').invalid && !this.searchForm.get('patient').value.trim()) return true;
    return false;
  }

}
