import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';


const components = [AdminComponent, ]

@NgModule({
  declarations: [...components, ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
