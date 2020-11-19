import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private auth: AuthService, private http: HttpService) { }

  load(): Promise<User> {
    let promise: Promise<User> = new Promise<any>((resolve, reject) => {
      let token = this.auth.token;
      if (token) {
        this.http.get('auth', 'authenticate', token).subscribe((res: User) => {
        this.auth.setAuthState(res);
        if (!res.id) this.auth.deleteToken()
      });
      } else {
        this.auth.setAuthState({id: '', username: '', role: '', first_seen: ''});
      }
      return resolve();
    });

    return promise;
  }
}
