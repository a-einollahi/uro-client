import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

import { CommonModule } from '@angular/common';


const component = [HomeComponent]
@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
