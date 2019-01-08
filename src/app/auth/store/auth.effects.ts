import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TRY_SIGNUP, TrySignup, SIGNUP, SET_TOKEN, SIGNIN, TRY_SIGNIN, LOGOUT } from './auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: { userName: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.userName, authData.password));
    }),
    switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      return [
        {
          type: SIGNUP
        },
        {
          type: SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect()
  authSignin = this.actions.pipe(
    ofType(TRY_SIGNIN),
    map((action: TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: { userName: string, password: string }) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.userName, authData.password));
    }),
    switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['./']);
      return [
        {
          type: SIGNIN
        },
        {
          type: SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions.pipe(
    ofType(LOGOUT),
    tap(() => {
      this.router.navigate(['./']);
    })
  );

  constructor (
    private actions: Actions,
    private router: Router
  ) {

  }
}
