import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['title' ,'status' , 'message','delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    return this.http.get('inbox', 'getAllMessages', null).subscribe(res => {
      res.map(el => {
        switch (el.status) {
          case null:
            el.status = 'خوانده نشده'
            break;

          default:
            break;
        }
        return el;
      })
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteMessage(id) {
    return this.http.post('inbox', 'deleteMessage', {id}).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(el => el['id'] !== id);
    })
  }

}
