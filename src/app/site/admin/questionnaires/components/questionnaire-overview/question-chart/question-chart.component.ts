import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { HttpService } from 'src/app/shared/services/http.service';
import { MessageService, MessageType } from 'src/app/shared/services/message.service';


@Component({
  selector: 'app-question-chart',
  templateUrl: './question-chart.component.html',
  styleUrls: ['./question-chart.component.scss']
})
export class QuestionChartComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['True', 'False'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.7)', 'rgba(0,255,0,0.7)', 'rgba(0,0,255,0.7),rgba(255,255,0,0.7)', 'rgba(0,255,255,0.7)', 'rgba(255,0,255,0.7)'],
    },
  ];

  constructor(public dialogRef: MatDialogRef<QuestionChartComponent>,
    private http: HttpService, private message: MessageService,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.loadChartInfo();
  }

  loadChartInfo() {
    // this.data.count
    const value = [];
    const key = [];
    this.data.question.overview.forEach(el=> {
      value.push(Object.values(el)[1]);
      key.push(Object.values(el)[0]);
    });

    this.pieChartLabels = key;
    this.pieChartData = value;
  }
}
