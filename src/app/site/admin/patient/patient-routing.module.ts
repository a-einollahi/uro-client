import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';
import { PatientModificationComponent } from './components/patient-modification/patient-modification.component';

const routes: Routes = [
  {path: '', component: PatientComponent},
  {path: 'patients-management', component: PatientModificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
