import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FriendEntity } from '../reducers/friends.reducer';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as friendActions from '../actions/friends.actions';
import { of } from 'rxjs';

@Injectable()
export class FriendEffects {

  postholiday$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendActions.friendAdded),
      map(a => a.entity),
      switchMap((originalEntity) =>
        this.client.post<FriendEntity>(environment.holidayUrl, { name: originalEntity.name })
          .pipe(
            map(response => friendActions.friendAddedSuccess({ oldId: originalEntity.id, newEntity: response }),
              catchError(err => of(friendActions.friendAddedFailure({ message: 'Could not Add that', entity: originalEntity })))
            ))
      )
    )
  );

  loadHolidayData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendActions.loadFriendData),
      switchMap(() => this.client.get<{ friends: FriendEntity[] }>(environment.holidayUrl)
        .pipe(
          map(response => response.friends),
          map(friends => friendActions.loadDataSucceeded({ data: friends }))
        ))
    ));
  constructor(private actions$: Actions, private client: HttpClient) { }
}
