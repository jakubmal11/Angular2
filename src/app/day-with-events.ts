import {Event} from './event';
import {LocalDate} from './local-date';

export class DayWithEvents {
  id: number;
  eventList: Event[];
  localDate: LocalDate;
}
