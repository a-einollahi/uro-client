import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: RadioButtonComponent, multi: true}
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {

  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() label: string;
  @Input() labelPosition: ['before', 'after'];
  @Input() required: boolean;
  @Input() options: string[] | number[];
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

  onChange() {
    console.log(this.control);
    
  }
}
