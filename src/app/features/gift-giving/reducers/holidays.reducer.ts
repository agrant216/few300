import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/holidays.actions';

export interface HolidayEntity {
  id: string;
  name: string;
  date: string;
}

export interface HolidayState extends EntityState<HolidayEntity> {

}

export const adapter = createEntityAdapter<HolidayEntity>();

const { selectAll } = adapter.getSelectors();
export const selectHolidayArray = selectAll;

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.holidayAdded, (s, a) => adapter.addOne(a.entity, s)),
  on(actions.loadDataSucceeded, (s, a) => adapter.addAll(a.data, s)),
  on(actions.holidayAddedSuccess, (s, a) => {
    const tempState = adapter.removeOne(a.oldId, s);
    return adapter.addOne(a.newEntity, tempState);
  }),
  on(actions.holidayAddedFailure, (s, a) => adapter.removeOne(a.entity.id, s))
);

export function reducer(state: HolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}



