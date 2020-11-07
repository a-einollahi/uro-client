import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';

const components = [AdminComponent]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
