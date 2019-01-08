import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

import { DataStorageService } from '../../shared/data-storage.service';

import { AppState } from 'src/app/store/app.reducers';
import { State as AuthState } from 'src/app/auth/store/auth.reducers';
import { Logout } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<AppState>
  ) { }

    ngOnInit() {
      this.authState = this.store.select('auth');
    }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}
