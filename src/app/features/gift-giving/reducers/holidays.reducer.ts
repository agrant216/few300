import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action } from '@ngrx/store';

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

// const initialState = adapter.getInitialState();
const initialState: HolidayState = {
  ids: ['1', '2', '3'],
  entities: {
    1: {
      id: '1',
      name: 'Christmas 2019',
      date: '2019-12-25T00:00:00.000Z'
    },
    2: {
      id: '2',
      name: 'New Year\'s',
      date: '2020-01-01T00:00:00.000Z'
    },
    3: {
      id: '3',
      name: 'Labor Day',
      date: '2019-08-01T00:00:00.000Z'
    }
  }
};

const reducerFunction = createReducer(
  initialState
);

export function reducer(state: HolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}



