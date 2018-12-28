import * as shoppingList from '../shopping-list/store/shopping-list.reducers';
import * as auth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: auth.State,
  shoppingList: shoppingList.State
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
  shoppingList: shoppingList.shoppingListReducer
};
