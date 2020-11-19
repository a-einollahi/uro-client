import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent implements OnInit {
  inputMode = false;
  // inputValue = '';
  title = '';

  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      input: new FormControl('', Validators.required)
    });
    this.title = this.data.title;
    if (this.data?.mode === 'input') {
      this.inputMode = true;
    }
  }

  onAccept() {
    if (!this.inputMode) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(this.form.value.input);
    }
  }

  onReject() {
    this.dialogRef.close(false);
  }
}
