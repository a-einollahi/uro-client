import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterService } from './../../../shared/services/router.service';
import { HttpService } from './../../../shared/services/http.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    header: new FormControl('', [Validators.required]),
    p1: new FormControl('', [Validators.required]),
    p2: new FormControl(''),
    ref: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(private http: HttpService, private router: RouterService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    return this.http.get('blog', 'getBlogContent', null).subscribe(res => {
      if (res) {
        this.form.setValue({
          header: res.header,
          p1: res.p1,
          p2: res.p2,
          ref: res.ref,
          description: res.description,
        });
      }
    });
  }

  updateContent() {
    return this.http.post('blog', 'createContent', this.form.value).subscribe(res => {
      this.form.reset();
      return this.router.navigate('/');
    });
  }

}
