import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from './../../shared/services/auth.service';
import { HttpService } from './../../shared/services/http.service';
import { RouterService } from './../../shared/services/router.service';
import { MessageService, MessageType } from 'src/app/shared/services/message.service';
import { YesNoDialogComponent } from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private auth: AuthService, private http: HttpService, private router: RouterService, private dialog: MatDialog, private message: MessageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  signIn() {
    this.auth.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    ).subscribe(res => {
      if (res.user.active === null) {
        this.message.showMessage("لطفا منتظر باشید تا اکانت شما فعال شود", MessageType.Warning);
        this.auth.logout();
        return this.router.navigate(['']);
      } else if (res.user.active === false) {
        this.message.showMessage("درحال حاضر این اکانت فعال نمی‌باشد", MessageType.Warning);
        this.auth.logout();
        return this.router.navigate(['']);
      }
            
      if (!res.user.first_seen) {
        this.router.navigate('/');
      } else {
        return this.changePassword();
      }
      
    });
  }

  private changePassword() {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '900px',
      minWidth: '500px',
      data: {
        mode: 'input',
        title: 'لطفا یک رمز عبور جدید برای اکانت خود انتخاب نمایید.'}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        this.auth.logout();
        return this.router.navigate('/login');
      } else {
        this.http.post('user', 'changePasswordByUser', {password: res}).subscribe();
        return this.router.navigate('/');
      }
    });
  }

}
