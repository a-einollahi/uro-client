import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';

const routes: Routes = [
  {path: '', component: UsersListComponent},
  {path: 'new-user', component: CreateNewUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
