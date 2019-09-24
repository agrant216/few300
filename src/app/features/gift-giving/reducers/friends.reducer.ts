import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/friends.actions';

export interface FriendEntity {
  id: string;
  name: string;
}

export interface FriendState extends EntityState<FriendEntity> {

}

export const adapter = createEntityAdapter<FriendEntity>();

const { selectAll } = adapter.getSelectors();
export const selectFriendArray = selectAll;

const initialState = adapter.getInitialState();
const reducerFunction = createReducer(
  initialState,
  on(actions.friendAdded, (s, a) => adapter.addOne(a.entity, s))
);
export function reducer(state: FriendState = initialState, action: Action) {
  return reducerFunction(state, action);
}
