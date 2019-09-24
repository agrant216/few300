import { createReducer, Action, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';
import * as holidayActions from '../actions/holidays.actions';

export interface UiHintsState {
  showAll: boolean;
  sortHolidaysBy: string;
  holidaysLoaded: boolean;
}

const initialState: UiHintsState = {
  showAll: true,
  sortHolidaysBy: 'name',
  holidaysLoaded: false
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowOnlyUpcoming, (s) => ({ ...s, showAll: false })),
  on(sortFilterActions.filterShowAll, (s) => ({ ...s, showAll: true })),
  on(sortFilterActions.sortHolidayByName, (s) => ({ ...s, sortHolidaysBy: 'name' })),
  on(sortFilterActions.sortHolidayByDate, (s) => ({ ...s, sortHolidaysBy: 'date' })),
  on(holidayActions.loadHolidaydata, (s) => ({ ...s, holidaysLoaded: false })),
  on(holidayActions.loadDataSucceeded, (s) => ({ ...s, holidaysLoaded: true }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return myReducer(state, action);
}
