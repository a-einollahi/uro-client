import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "jalali-moment";

import { HttpService } from "src/app/shared/services/http.service";
import { MessageService, MessageType} from './../../../../shared/services/message.service';
import { AnswerInfoComponent } from "./answer-info/answer-info.component";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit, AfterViewInit {

  patientLength = 0;
  displayedColumns = [ "position", "full name", "national code", "questionnaire", "creation at", "select"];
  dataSource = new MatTableDataSource();
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(""),
    from: new FormControl(moment().startOf('jmonth')),
    until: new FormControl(moment()),
  });
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private http: HttpService, private dialog: MatDialog, private message: MessageService) {}

  ngOnInit(): void {
    this.onSearch();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    const searchField = {
      from: moment(this.searchForm.value.from).isValid()
        ? moment(this.searchForm.value.from).format("YYYY/MM/DD")
        : null,
      until: moment(this.searchForm.value.until).isValid()
        ? moment(this.searchForm.value.until).add(1, "day").format("YYYY/MM/DD")
        : null,
    };

    if (moment(this.searchForm.value.from).isAfter(moment(this.searchForm.value.until)) ||
      !moment(this.searchForm.value.from).isBefore(moment(this.searchForm.value.until))) {
      this.message.showMessage('اشکال در وارد کردن تاریخ', MessageType.Error);
      this.dataSource.data = [];
      return;
    }

    this.http.get("answer", "getAllAnswerSheets", searchField)
      .subscribe((data) => {
        this.patientLength = 0;
        if (data) {
          this.mapData(data);
        }
      });
  }

  mapData(data) {
    const newData = [];

    this.patientLength = data.length;
    data.forEach((el, index) => {
      const answerSheet = {
        id: el.id,
        position: index + 1,
        "full name": `${el.patient.first_name || ""} ${el.patient.last_name}`,
        questionnaire: el.questionnaire.questionnaire_title,
        "national code": el.patient.national_code,
        "creation at": el.createdAt,
      };

      newData.push(answerSheet);
    });

    this.dataSource.data = newData;
  }

  onSearch() {
    this.loadData();
  }

  onSelectUser(el) {
    this.dialog.open(AnswerInfoComponent, {
      maxWidth: "1400px",
      width: "600px",
      minWidth: "360px",
      data: {
        id: el.id,
        creation_at: el["creation at"],
        questionnaire: el.questionnaire,
        name: el["full name"],
      },
    });
  }

  onSearchFilter(filter) {
    this.dataSource.filter = filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
