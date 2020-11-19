import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum MessageType {
  Success = 'Success',
  Information = 'Information',
  Warning = 'Warning',
  Error = 'Error'
}

@Injectable({providedIn: 'root'})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {}

  showMessage(msg, msgType, action = null) {
    const config: any = {direction: 'rtl'};
    switch (msgType) {
      case MessageType.Success: {
        config.verticalPosition = 'top';
        config.duration = 2400;
        config.panelClass = ['alert-success'];
      }
        break;
      case MessageType.Information: {
        config.verticalPosition = 'top';
        config.duration = 3600;
        config.panelClass = ['alert-info'];
      }
        break;
      case MessageType.Warning: {
        config.verticalPosition = 'top';
        config.duration = 4800;
        config.panelClass = ['alert-warning'];
      }
        break;
      case MessageType.Error: {
        config.verticalPosition = 'bottom';
        config.duration = 6000;
        config.panelClass = ['alert-danger'];
      }
        break;
    }
      
    this.snackBar.open(msg, action, config);
  }
}