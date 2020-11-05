import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  myForm: FormGroup;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl({value: '', disabled: false}, [Validators.required]),
      checkbox: new FormControl({value: '', disabled: false}),
      selection: new FormControl({value: '', disabled: false}, [Validators.required]),
      auto: new FormControl({value: '', disabled: false}, [Validators.required]),
      start: new FormControl({value: '', disabled: false}, [Validators.required])
    })
  }

}
