import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../../shared/services/http.service';
import { MessageService, MessageType } from './../../../../shared/services/message.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  form: FormGroup;
  constructor(private http: HttpService, private message: MessageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    })
  }

  sendMessage() {
    return this.http.post('inbox', 'sendNewMessage', this.form.value).subscribe( res => {
      this.message.showMessage('پیغام شما در سیستم ثبت شد.', MessageType.Success);
      this.form.reset();
    });
  }

}
