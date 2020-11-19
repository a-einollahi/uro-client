import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-unread-message',
  templateUrl: './unread-message.component.html',
  styleUrls: ['./unread-message.component.css']
})
export class UnreadMessageComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['title', 'sender', 'message', 'response'];
  tableCounts = 0;
  showResponse = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  form: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    response: new FormControl(null),
    status: new FormControl(null, [Validators.required]),
    sender: new FormControl(null, [Validators.required]),
  });

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    return this.http.get('inbox', 'getNewMessages', null).subscribe(res => {
      res.map(el => {
        el['sender'] = (el.user.person.first_name || '') + ' ' + (el.user.person.last_name || '');
        return el;
      })
      this.dataSource.data = res;
    })
  }

  activeResponse(element) {
    this.form.patchValue({
      id: element.id,
      sender: (element.user.person.first_name || '') + ' ' + (element.user.person.last_name || ''),
      status: element.status || 'خوانده نشده'
    })

    this.showResponse = true;
  }

  sendResponse() {
    return this.http.post('inbox', 'sendResponse', this.form.value).subscribe(res => {

      this.dataSource.data = this.dataSource.data.filter(el => el['id'] !== this.form.get('id').value);
      this.showResponse = false;
      this.form.reset();
    });
  }

}
