import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        const token = this.auth.token;
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', token ? `Bearer ${token}` : '')
        });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    }
}