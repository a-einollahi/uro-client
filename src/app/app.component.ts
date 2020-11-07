import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './shared/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  limit: number;
  offset: number;
  pagination: any;
  dataSource: any[];
  columns = ['userId', 'id', 'title']

  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl({value: '', disabled: false}, [Validators.required]),
      checkbox: new FormControl({value: '', disabled: false}),
      selection: new FormControl({value: '', disabled: false}, [Validators.required]),
      auto: new FormControl({value: '', disabled: false}, [Validators.required]),
      start: new FormControl({value: '', disabled: false}, [Validators.required]),
      radio: new FormControl({value: 'Two', disabled: false}, [Validators.required])
    });
    this.offset = 10;
    this.limit = 5;
    this.pagination= {pageIndex: 0, pageSize: this.limit || null}

    this.http.album(this.offset, this.limit).subscribe(res => {
      this.dataSource = res
    })
  }
  
  onPaginate(ev){
    console.log(ev);
  }

}
