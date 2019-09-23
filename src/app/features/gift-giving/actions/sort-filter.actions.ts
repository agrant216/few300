import { createAction } from '@ngrx/store';

export const filterShowAll = createAction(
  '[gift-giving] filter show all'
);

export const filterShowOnlyUpcoming = createAction(
  '[gift-giving] filter show only upcoming'
);
