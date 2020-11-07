import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() pagination: any;
  @Input() count = 0;
  currentPage;
  pageSize;

  dataSource = new MatTableDataSource();
  @Input() displayColumns: string[] = [];
  @Input() pageSizeOptions;
  @Input() data: any[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  @Output() paginate: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit(): void {
    this.dataSource.data = this.data;    
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngAfterContentChecked(): void {
    this.dataSource?.paginator?.length && this.count !== undefined ? this.dataSource.paginator.length = this.count : null;
    this.pagination?.pageIndex || this.pagination?.pageIndex === 0 ? this.currentPage = this.pagination?.pageIndex : null;
    this.pagination?.pageSize ? this.pageSize = this.pagination?.pageSize : null;
  }

  onChangePagination(page: PageEvent) {
    this.paginate.emit(page); // length,pageIndex,pageSize,previousPageIndex
  }
  
}
