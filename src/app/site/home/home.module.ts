import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../../shared/modules/shared.module';

import { HomeComponent } from './home.component';


const component = [HomeComponent]
@NgModule({
  declarations: [...component],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
