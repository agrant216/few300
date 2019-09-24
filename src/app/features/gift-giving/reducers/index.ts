export const featureName = 'giftGiving';
import * as fromHolidays from './holidays.reducer';
import * as fromUiHints from './ui-hints.reducer';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { GiftGivingModule } from '../gift-giving.module';
import { HolidayListItem } from '../models';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  uiHints: fromUiHints.reducer
};


// Feature Selector
const selectFeature = createFeatureSelector<GiftGivingState>(featureName);

// Selector Per Branch (eg. one for the holidays)
const selectHolidaysBranch = createSelector(selectFeature, b => b.holidays);
const selectUiHintsBranch = createSelector(selectFeature, b => b.uiHints);
// 'Helpers'
const selectHolidayArray = createSelector(selectHolidaysBranch, fromHolidays.selectHolidayArray);
export const selectShowAllHolidays = createSelector(selectUiHintsBranch, b => b.showAll);
export const selectSortingHolidaysBy = createSelector(selectUiHintsBranch, b => b.sortHolidaysBy);
// Then what your componenst need.

export const selectHolidaysLoaded = createSelector(selectUiHintsBranch, b => b.holidaysLoaded);
// we need one that returns a HolidayListItem for our holiday list component

const selectHolidayListItemsUnFiltered = createSelector(selectHolidayArray, holidays =>
  holidays.map(holiday => ({
    id: holiday.id,
    date: holiday.date,
    name: holiday.name,
    past: new Date(holiday.date) < new Date(),
    isTemporary: holiday.id.startsWith('T')
  } as HolidayListItem))
);

const selectHolidayListSorted = createSelector(selectHolidayListItemsUnFiltered, selectSortingHolidaysBy, (list, by) => {
  return [...list.sort((lhs, rhs) => {
    if (lhs[by] < rhs[by]) {
      return -1;
    }
    if (lhs[by] > rhs[by]) {
      return 1;
    }
    return 0;
  })];
});
export const selectHolidayListItems = createSelector(selectShowAllHolidays, selectHolidayListSorted, (all, holidays) =>
  holidays.filter(h => all ? true : !h.past)
);
