import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from './../../../shared/modules/shared.module';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';


@NgModule({
  declarations: [UsersListComponent, UserDetailComponent, CreateNewUserComponent],
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  entryComponents: [UserDetailComponent]
})
export class UsersModule { }
