import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-other-message',
  templateUrl: './other-message.component.html',
  styleUrls: ['./other-message.component.css']
})
export class OtherMessageComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['title', 'sender', 'message', 'delete'];
  tableCounts = 0;
  showResponse = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    return this.http.get('inbox', 'GetReadedMessages', null).subscribe(res => {
      res.map(el => {
        el['sender'] = (el.user.person.first_name || '') + ' ' + (el.user.person.last_name || '');
        return el;
      })
      this.dataSource.data = res;
    })
  }

  deleteMessage(element) {
    return this.http.post('inbox', 'deleteMessage', {id: element.id}).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(el => el['id'] !== element.id);
    })
  }
}
