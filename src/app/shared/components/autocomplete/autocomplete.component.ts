import { Component, Injector, Input, ViewChild, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: AutocompleteComponent, multi: true}
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() hint: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() tooltipPosition: string;
  
  @Input() list: string[] = [];
  filteredOptions: Observable<string[]>;
  
  constructor(public injector: Injector) { }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        map(value => this._filter(value))
      )
  }

  private _filter(value: string): string[] {
    return this.list.filter(option => option.toLowerCase().includes(value.toLowerCase()));
  }

  onBlur() {
    if (!this.control.value) return;
    if (!this.list.includes(this.control.value))
      this.control.setErrors({invalidMsg: 'some error in autocomplete'})
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

  getErrorMessage() {
    if (this.control.hasError('required')) return 'some message error that show requirement';
    if (this.control.hasError('invalidMsg')) return this.control.errors.invalidMsg;
    if (this.control.hasError('pattern')) return 'some message error that show pattern';
  }

}
