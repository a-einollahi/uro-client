import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from './../../../shared/modules/shared.module';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


@NgModule({
  declarations: [UsersListComponent, UserDetailComponent],
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  entryComponents: [UserDetailComponent]
})
export class UsersModule { }
