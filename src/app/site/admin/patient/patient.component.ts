import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/shared/services/http.service';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['position', 'full name', 'age', 'mobile', 'national code', 'city'];
  userNumbers = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private http: HttpService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.http.get('patient', 'getPatientList', true).subscribe(res => {
      if (res) {
        this.mapData(res);
      }
    }, err => {
      console.log(err);
    });
  }

  mapData(data) {
    const newData = [];
    this.userNumbers = data.length;
    data.forEach((el, index) => {
      const person = {
        id: el.id,
        position: index + 1,
        'full name': `${el.first_name || ''} ${el.last_name}`,
        mobile: el.mobile,
        'national code': el.national_code,
        'city': `${el.state || ''} ${el.city || ''}`,
        age: moment(el.birthday).fromNow().split(' hour ago')[0].split(' years ago')[0]
      };

      newData.push(person);
    });

    this.dataSource.data = newData;
  }

  onSearchFilter(filter) {
    this.dataSource.filter = filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayedColumn(col) {
    switch (col) {
      case 'position': return 'ردیف';
      case 'full name': return 'نام و نام‌خانوادگی';
      case 'age': return 'سن';
      case 'national code': return 'کد‌ملی';
      case 'mobile': return 'تلفن همراه';
      case 'city': return 'شهر';

      default: return col;
    }
  }
}
