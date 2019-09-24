import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FriendListItem } from '../../../models/friend-list-item';

@Component({
  selector: 'app-friend-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendListComponent implements OnInit {

  @Input() model: FriendListItem[] = [];
  constructor() { }

  ngOnInit() {
  }

}
