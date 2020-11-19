import { Component, Injector, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: DatepickerComponent, multi: true}
  ]
})
export class DatepickerComponent implements ControlValueAccessor {

  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() hint: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() tooltipPosition: string;
  
  constructor(public injector: Injector) { }

  get control() {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  registerOnChange(fn: any): void { this.formControlDirective.valueAccessor.registerOnChange(fn);}

  registerOnTouched(fn: any): void { this.formControlDirective.valueAccessor.registerOnTouched(fn);}
  
  writeValue(obj: any): void { this.formControlDirective.valueAccessor.writeValue(obj);}

  setDisabledState(isDisabled: boolean): void { this.formControlDirective.valueAccessor.setDisabledState(isDisabled);}

  getErrorMessage() {
    if (this.control.hasError('required')) return 'تکمیل این فیلد الزامی است';
    if (this.control.hasError('invalidMsg')) return this.control.errors.invalidMsg;
    if (this.control.hasError('pattern')) return 'some message error that show pattern';
  }
}
