import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/friends.actions';

export interface FriendEntity {
  id: string;
  name: string;
}

export interface FriendState extends EntityState<FriendEntity> {
  selectedFriend: string;
}

export const adapter = createEntityAdapter<FriendEntity>();

const initialState = adapter.getInitialState({
  selectedFriend: null
});
const reducerFunction = createReducer(
  initialState,
  on(actions.friendAdded, (s, a) => adapter.addOne(a.entity, s)),
  on(actions.loadDataSucceeded, (s, a) => adapter.addAll(a.data, s)),
  on(actions.friendAddedSuccess, (s, a) => {
    const tempState = adapter.removeOne(a.oldId, s);
    return adapter.addOne(a.newEntity, tempState);
  }),
  on(actions.friendAddedFailure, (s, a) => adapter.removeOne(a.entity.id, s)),
  on(actions.selectFriend, (state, action) => ({ ...state, selectedFriend: action.id }))
);
export function reducer(state: FriendState = initialState, action: Action) {
  return reducerFunction(state, action);
}

export const { selectAll: selectFriendArray, selectEntities: selectFriendEntities } = adapter.getSelectors();
