import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import { pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as sortFilterActions from '../actions/sort-filter.actions';
// hooks into the app started effect to kick off any feature specific effects

@Injectable()
export class AppEffects {

  applicationStartedStuff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => sortFilterActions.loadSavedprefs())
    )
  );
  constructor(private actions$: Actions) {

  }
}
