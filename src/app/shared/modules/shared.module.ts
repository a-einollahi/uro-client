import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
// shared modules
import { MaterialsModule } from './materials.module';
import { PipesModule } from './pipes.module';
// shared components
import { InputComponent } from './../components/input/input.component';
import { CheckboxComponent } from './../components/checkbox/checkbox.component';
import { RadioButtonComponent } from './../components/radio-button/radio-button.component';
import { SelectComponent } from './../components/select/select.component';
import { AutocompleteComponent } from './../components/autocomplete/autocomplete.component';
import { DatepickerComponent } from './../components/datepicker/datepicker.component';
import { TableComponent } from '../components/table/table.component';
// directives
import { EmailDirective } from '../components/input/directives/email.directive';
import { MobileDirective } from '../components/input/directives/mobile.directive';
import { PhoneDirective } from '../components/input/directives/phone.directive';
import { NationalcodeDirective } from '../components/input/directives/nationalcode.directive';


const sharedComponents = [ InputComponent, CheckboxComponent, RadioButtonComponent, SelectComponent, AutocompleteComponent, TableComponent, DatepickerComponent ]
const modules = [
  MaterialsModule, PipesModule, CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule
];
const components = [
];
const directives = [ 
  EmailDirective, MobileDirective, PhoneDirective, NationalcodeDirective 
]


@NgModule({
  imports: [...modules],
  declarations: [...sharedComponents, ...components, ...directives],
  exports: [...modules, ...sharedComponents, ...components, ...directives],
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true},
    { provide: NG_VALIDATORS, useExisting: MobileDirective, multi: true},
    { provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true},
    { provide: NG_VALIDATORS, useExisting: NationalcodeDirective, multi: true}
  ]
})
export class SharedModule {}


// most npm
// ng2-nouislider
// @ng-bootstrap/ng-bootstrap

// @ngx-translate/core
// ngx-pagination
// ng2-file-upload
// ngx-infinite-scroll
// @ng-dynamic-forms/core
// ngx-moment
// ngx-bootstrap