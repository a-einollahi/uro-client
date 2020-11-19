import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule)},
    {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
    {path: 'patients', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)},
    {path: 'questionnaires', loadChildren: () => import('./questionnaires/questionnaires.module').then(m => m.QuestionnairesModule)},
    {path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
