import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import { pipe } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import * as sortFilterActions from '../actions/sort-filter.actions';
import { loadHolidaydata } from '../actions/holidays.actions';
import { loadFriendData } from '../actions/friends.actions';

// hooks into the app started effect to kick off any feature specific effects

@Injectable()
export class AppEffects {

  applicationStartedStuff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => sortFilterActions.loadSavedprefs())
    )
  );

  onAppStartLoadHolidays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => loadHolidaydata())
    ), { dispatch: true });

  onAppStartLoadFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => loadFriendData())
    ), { dispatch: true });

  constructor(private actions$: Actions) {

  }
}
