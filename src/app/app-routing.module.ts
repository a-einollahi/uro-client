import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './site/register/register.component';
import { LoginComponent } from './site/login/login.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./site/home/home.module').then(m => m.HomeModule)},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', loadChildren: () => import('./site/admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
