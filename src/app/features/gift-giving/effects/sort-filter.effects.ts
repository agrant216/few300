import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as actions from '../actions/sort-filter.actions';
import { tap, filter, map } from 'rxjs/operators';

@Injectable()
export class SortFilterEffects {

  // 1. When we get the loadPrefs, go to local starage and load the and dispatch right actions.

  loadSort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSavedprefs),
      map(() => localStorage.getItem('holiday-sort')),
      filter(savedSort => savedSort !== null),
      map(savedSort => {
        if (savedSort === 'name') {
          return actions.sortHolidayByName();
        } else {
          return actions.sortHolidayByDate();
        }
      })
    )
  );
  loadFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSavedprefs),
      map(() => localStorage.getItem('holiday-filter')),
      filter(savedFilter => savedFilter !== null),
      map(savedFilter => {
        if (savedFilter === 'all') {
          return actions.filterShowAll();
        } else {
          return actions.filterShowOnlyUpcoming();
        }
      })
    ));
  // 2. When sort is changed, save pref.
  saveSortHolidayName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sortHolidayByName),
      tap(() => localStorage.setItem('holiday-sort', 'name'))
    ), { dispatch: false }
  );

  saveSortHolidayDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sortHolidayByDate),
      tap(() => localStorage.setItem('holiday-sort', 'date'))
    ), { dispatch: false }
  );
  // 3. when filter is changed, save that pref.
  saveFilterAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.filterShowAll),
      tap(() => localStorage.setItem('holiday-filter', 'all'))
    ), { dispatch: false }
  );

  saveFilterUpcoming$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.filterShowOnlyUpcoming),
      tap(() => localStorage.setItem('holiday-filter', 'upcoming'))
    ), { dispatch: false }
  );

  constructor(private actions$: Actions) { }

}
