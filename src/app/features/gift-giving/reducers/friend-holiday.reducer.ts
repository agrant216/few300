import { EntityState, createEntityAdapter, Update } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/friend-holiday.actions';
import { FriendHoliday } from '../models';

export interface FriendHolidayEntity {
  id: string;
  holidaysCelebrated: string[];
}

export interface FriendHolidayState extends EntityState<FriendHolidayEntity> {

}

export const adapter = createEntityAdapter<FriendHolidayEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.assignHolidayToFriend, (s, a) => {
    if (s.entities[a.friendId]) {
      const update: Update<FriendHolidayEntity> = {
        id: a.friendId,
        changes: {
          holidaysCelebrated: [a.holidayId, ...s.entities[a.friendId].holidaysCelebrated]
        }
      };
      return adapter.updateOne(update, s);
    } else {
      return adapter.addOne({
        id: a.friendId,
        holidaysCelebrated: [a.holidayId]
      }, s);
    }
  })
);

export function reducer(state: FriendHolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}

export const { selectEntities: selectFriendHolidayEntities } = adapter.getSelectors();

