import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true}
  ]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() checked: boolean;
  @Input() indeterminate: boolean | null;
  @Input() label: string;
  @Input() labelPosition: ['before', 'after'];
  @Input() required: boolean;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() tooltipPosition: string;
  
  constructor(public injector: Injector) { }

  ngOnInit(): void {
    if (this.checked !== undefined) {
      if (this.checked === false) {
        this.control.setValue(false);
      } else {
        this.control.setValue(true);
      }
    }
  }

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

  onChangeCheckbox() {
    if (this.indeterminate === undefined) return;
    if (this.indeterminate) {
      this.indeterminate = false;
      this.control.setValue(true)
    } else {
      if (this.indeterminate === false) {
        this.indeterminate = null;
        this.control.setValue(false)
      } else {
        this.indeterminate = true;
        this.control.setValue(null)
      }
    }
  }


}
