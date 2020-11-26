import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/shared/services/http.service';
import { YesNoDialogComponent } from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['position', 'full name', 'email', 'national code', 'user access', 'status'];
  userNumbers = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  searchForm: FormGroup;
  constructor(private http: HttpService, private dialog: MatDialog) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumn(col) {
    switch (col) {
      case 'position': return 'ردیف';
      case 'full name': return 'نام و نام‌خانوادگی';
      case 'email': return 'ایمیل';
      case 'national code': return 'کد‌ملی';
      case 'user access': return 'سطح دسترسی';
      case 'status': return 'وضعیت';

      default: return col;
    }
  }

  loadUsers() {
    this.http.get('user', 'getAllUsers', true).subscribe(res => {
      if (res) {
        this.mapData(res);
      }
    });
  }

  mapData(data) {
    const newData = [];
    this.userNumbers = data.length;
    data.forEach((el, index) => {
      const person = {
        id: el.user.id,
        active: el.user.active,
        position: index + 1,
        'full name': `${el.first_name || ''} ${el.last_name}`,
        email: el.user.email,
        'national code': el.national_code,
        'user access': el.user.role === 'admin' ? 'مدیر' : 'کاربر',
        status: el.user.active ? '' : 'غیر‌فعال'
      };

      newData.push(person);
    });

    this.dataSource.data = newData;
  }

  onSearchFilter() {
    this.dataSource.filter = this.searchForm.value.search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectUser(row) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        id: row.id
      }
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        return this.onChangePassword(id);
      }
    });
  }

  onChangePassword(id) {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '900px',
      minWidth: '500px',
      data: {id,
        mode: 'input',
        title: 'لطفا رمز عبور جدید را وارد نمایید.'}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.http.post('user', 'changePassword', {id, password: res}).subscribe();
    });
  }

}
