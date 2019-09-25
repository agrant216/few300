import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectFriendHolidayModel } from '../../reducers';
import { selectFriend } from '../../actions/friends.actions';
import { FriendHoliday } from '../../models';
import { assignHolidayToFriend } from '../../actions/friend-holiday.actions';


@Component({
  selector: 'app-friend-gifts',
  templateUrl: './friend-gifts.component.html',
  styleUrls: ['./friend-gifts.component.css']
})
export class FriendGiftsComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store<GiftGivingState>) { }

  model$: Observable<FriendHoliday>;
  subscription: Subscription;

  ngOnInit() {
    this.model$ = this.store.select(selectFriendHolidayModel);
    // should be replaced with selector/observable
    this.subscription = this.activatedRoute.paramMap.pipe(
      map(params => {
        // this.id = params.get('id');
        this.store.dispatch(selectFriend({ id: params.get('id') }));
      })
    ).subscribe();

  }

  backToList() {
    this.router.navigate(['/gifts', 'friends']);
  }

  addHoliday(friendId: string, holidayId: string) {
    this.store.dispatch(assignHolidayToFriend({ friendId, holidayId }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
