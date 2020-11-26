import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/shared/services/http.service';
import { RouterService } from './../../../../../shared/services/router.service';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.css']
})
export class QuestionnairesListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['position', 'title', 'creation at', 'options', 'details'];
  questionnaireCounts = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  searchForm: FormGroup;
  constructor(private http: HttpService, private router: RouterService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
    this.loadQuestionnaireData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadQuestionnaireData() {
    this.http.get('questionnaire', 'getAllQuestionnaire', null)
      .subscribe(data => {
        this.mapData(data);
      });
  }

  mapData(data) {
    if (!data || !data.length) {
      return;
    }

    const newData = [];
    this.questionnaireCounts = data.length;
    data.forEach((el, index) => {
      const person = {
        id: el.id,
        position: index + 1,
        title: el.questionnaire_title,
        'creation at': el.createdAt
      };

      newData.push(person);
    });

    this.dataSource.data = newData;
  }

  onClickEdit(e) {
    this.router.navigate('/admin/questionnaires/edit/'+e.id);
  }

  onSearchFilter() {
    this.dataSource.filter = this.searchForm.value.search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
