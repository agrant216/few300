import { createReducer, Action, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';

export interface UiHintsState {
  showAll: boolean;
}

const initialState: UiHintsState = {
  showAll: true
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowOnlyUpcoming, () => ({ showAll: false })),
  on(sortFilterActions.filterShowAll, () => ({ showAll: true }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return myReducer(state, action);
}
