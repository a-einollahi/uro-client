import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/modules/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientComponent } from './patient.component';
import { PatientModificationComponent } from './components/patient-modification/patient-modification.component';
import { EditPatientComponent } from './components/patient-modification/edit-patient/edit-patient.component';


@NgModule({
  declarations: [PatientComponent, PatientModificationComponent, EditPatientComponent],
  imports: [
    SharedModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
