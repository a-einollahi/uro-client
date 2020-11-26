import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  header: string;
  p1: string;
  p2: string;
  ref: string;
  description: string;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get('blog', 'getBlogContent', null).subscribe(res => {
      if (res) {
        this.header = res.header;
        this.p1 = res.p1;
        this.p2 = res.p2;
        this.ref = res.ref;
        this.description = res.description;
      }
    })
  }

}
