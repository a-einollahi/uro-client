import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-phone',
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.scss']
})
export class InputPhoneComponent implements OnInit {

  number = '';
  @Input() phoneNumber = [];
  phoneDisablity = true;

  @Input() title = 'تلفن';
  constructor() {}

  ngOnInit() {
  }

  inputPhoneNumber(e) {
    if (!e.target.value || this.phoneNumber.includes(e.target.value) || e.target.value.match(/[^0-9]/i)) {
      this.phoneDisablity = true;
      return;
    }

    this.number = e.target.value;
    this.phoneDisablity = false;
  }

  @Output() phoneEmit: EventEmitter<any> = new EventEmitter();
  onAddPhone() {
    if (!this.number || this.phoneNumber.includes(this.number) || this.number.match(/[^0-9]/i)) {
      return;
    }

    this.phoneNumber.push(this.number);
    this.number = '';
    this.phoneDisablity = true;
    this.onEmit();
  }

  onEmit() {
    this.phoneEmit.emit(this.phoneNumber);
  }

  onRemovePhone(e) {
    this.phoneNumber = this.phoneNumber.filter(p => p !== e);
  }

}
