import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendListItem } from '../../models/friend-list-item';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectFriendListItems, selectfriendsLoaded } from '../../reducers';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friendsLoaded$: Observable<boolean>;
  friends$: Observable<FriendListItem[]>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.friends$ = this.store.select(selectFriendListItems);
    this.friendsLoaded$ = this.store.select(selectfriendsLoaded);
  }

}
