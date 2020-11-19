import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpService } from './http.service';
import { RouterService } from './router.service';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState$: BehaviorSubject<User> = new BehaviorSubject<User>({id: '', username: '', role: '', first_seen: ''});
  private TOKEN_KEY = 'token';

  constructor(private http: HttpService, private router: RouterService) { }

  register(payload) {
    return this.http.post( 'user', 'registerNewUser', payload);
  }

  login(username: string, password: string) {
    return this.http.login({username, password})
      .pipe(
        tap((data: any) => {
          if (data?.token && data?.user ) {
            this.saveToken = data.token;
            this.setAuthState({
              id: data.user.id,
              username: data.user.username,
              role: data.user.role,
              first_seen: data.user.first_seen,
            });
          }
        })
      );
  }

  logout() {
    this.http.logout().pipe(
      tap(res => {
        this.setAuthState({id: '', username: '', role: '', first_seen: ''});
        this.deleteToken();
        this.router.navigate('/login')
      })
    ).subscribe();
  }

  get authState(): Observable<User> {
    return this.authState$.asObservable();
  }

  setAuthState(value: User): void {
    this.authState$.next(value);
  }

  set saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  deleteToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get token(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
