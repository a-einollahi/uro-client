import { Component, OnInit } from '@angular/core';

import { MENU } from './constants/adminMenu';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu = MENU;

  constructor() { }

  ngOnInit(): void {
  }

}
