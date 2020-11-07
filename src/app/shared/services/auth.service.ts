import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private TOKEN_KEY = 'token';

  constructor(private httpService: HttpService) { }

  register() {}
  login() {}
  logout() {}

  initializeState(): void {
    let token = this.token;
    if (!token) {
      this.saveToken = 'sss';
      this.setAuthState(false);
    } else {
      // check authentication validity
    }
  }

  get authState(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  setAuthState(value: boolean): void {
    this.authState$.next(value);
  }

  private set saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private deleteToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private get token(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
