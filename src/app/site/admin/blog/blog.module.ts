import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/modules/shared.module';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';


@NgModule({
  declarations: [BlogComponent],
  imports: [
    SharedModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
