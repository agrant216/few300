import { createReducer, Action, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';

export interface UiHintsState {
  showAll: boolean;
  sortHolidaysBy: 'name' | 'date';
}

const initialState: UiHintsState = {
  showAll: true,
  sortHolidaysBy: 'name'
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowOnlyUpcoming, (s) => ({ ...s, showAll: false })),
  on(sortFilterActions.filterShowAll, (s) => ({ ...s, showAll: true })),
  on(sortFilterActions.sortHolidayByName, (s) => ({ ...s, sortHolidaysBy: 'name' })),
  on(sortFilterActions.sortHolidayByDate, (s) => ({ ...s, sortHolidaysBy: 'date' }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return myReducer(state, action);
}
