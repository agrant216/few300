import { createAction } from '@ngrx/store';
import { HolidayEntity } from '../reducers/holidays.reducer';

let currentId = 1;

export const holidayAdded = createAction(
  '[gift giving] holiday added',
  ({ name, date }: { name: string, date: string }) => ({
    entity: {
      id: 'T' + currentId++,
      name,
      date
    } as HolidayEntity
  })
);
