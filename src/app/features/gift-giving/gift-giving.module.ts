import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftGivingComponent } from './gift-giving.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HolidaysComponent } from './containers/holidays/holidays.component';
import { FriendsComponent } from './containers/friends/friends.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './reducers';
import { ListComponent } from './containers/holidays/list/list.component';
import { EntryComponent } from './containers/holidays/entry/entry.component';
import { SortFilterComponent } from './containers/holidays/sort-filter/sort-filter.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { SortFilterEffects } from './effects/sort-filter.effects';


const routes: Routes = [
  {
    path: 'gifts',
    component: GiftGivingComponent,
    children: [
      {
        path: 'holidays',
        component: HolidaysComponent
      },
      {
        path: 'friends',
        component: FriendsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ],

  }
];

@NgModule({
  declarations: [
    GiftGivingComponent,
    DashboardComponent,
    HolidaysComponent,
    FriendsComponent,
    ListComponent,
    EntryComponent,
    SortFilterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([AppEffects, SortFilterEffects])
  ]
})
export class GiftGivingModule { }
