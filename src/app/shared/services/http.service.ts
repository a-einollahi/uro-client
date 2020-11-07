import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_URL = '/api';
  constructor(private _http: HttpClient) { }

  private _post(method, module, command, payload) {
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
    return this._post('post', module, command, payload);
  }
  
  get(module, command, payload) {
    return this._post('get', module, command, payload);
  }

  album(start, limit) {
    return new Observable<any>(observer => {
      this._http.get(`https://jsonplaceholder.typicode.com/albums${start || limit ? '?':''}${start?'_start='+start:''}${start && limit ?'&': ''}${limit?'_limit='+limit: ''}`)
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

  
}
