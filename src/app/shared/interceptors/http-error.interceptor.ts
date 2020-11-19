import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService, MessageType } from '../services/message.service';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
    constructor(private message: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(err => {
                if (!err.error || !err.error.message) {
                  err.error.message = "خطا در سیستم";
                }
                this.message.showMessage(err.error.message, MessageType.Error)
                if (err instanceof HttpErrorResponse) {
                    const text = err.error && err.error.message ? err.error.message : err.statusText;
                    // (<any>window).globalEvents.emit('open error dialog', text);
                }

                return throwError(err);
            })
        );
    }
}
