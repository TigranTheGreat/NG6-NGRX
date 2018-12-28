import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/app.reducers';
import { State as AuthState } from '../auth/store/auth.reducers'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    return this.store.select('auth')
      .take(1)
      .switchMap((authState: AuthState) => {
        const copiedReq = req.clone({params: req.params.set('auth', authState.token )});
        return next.handle(copiedReq);
      });
    // return null;
  }
}
