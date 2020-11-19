import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_URL = '/api';
  constructor(private _http: HttpClient) { }

  private call(method, module, command, payload) {
    return new Observable<any>(observer => {
      this._http.post(this.API_URL, {method, module, command, payload})
        .pipe(map(data => data))
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        })
    });
  }

  post(module, command, payload) {
    return this.call('post', module, command, payload);
  }
  
  get(module, command, payload) {
    return this.call('get', module, command, payload);
  }

  login(payload) {
    return this._http.post(this.API_URL + '/login', payload).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  logout() {
    return this._http.get(this.API_URL + '/logout').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    return throwError(err);
  }

  
}
