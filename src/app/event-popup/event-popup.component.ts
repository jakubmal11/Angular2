import { Component, OnInit } from '@angular/core';
import {DayWithEvents} from '../day-with-events';
import {Event} from '../event';
import { Headers, Http } from '@angular/http';
import {EventDto} from '../event-dto';
import {LocalDateTimeDto} from '../local-date-time-dto';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.css']
})
export class EventPopupComponent implements OnInit {
  constructor(private http: Http, private httpClient: HttpClient) { }

  public visible = false;
  public visibleAnimate = false;
  public selectedDay: DayWithEvents;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  newEventDto: EventDto;
  url = 'http://localhost:8080/calendar';

  ngOnInit() {
  }

  public show(selectedDay: DayWithEvents): void {
    this.selectedDay = selectedDay;
    console.log(this.selectedDay);
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  editEvent(event: Event) {
    console.log('edit ' + event);
  }
  removeEvent(event: Event) {
    console.log('remove' + event);

    this.http.post(
      this.url + '/event/remove',
      event.id,
      {headers: this.headers}).toPromise()
      .then(res => console.log(res));
    this.updateDay();
  }
  addNewEvent() {
    this.newEventDto = new EventDto();
    this.newEventDto.localDateTimeDto = new LocalDateTimeDto(new Date().getMinutes(),
      new Date().getHours(), this.selectedDay.localDate.dayOfMonth, this.selectedDay.localDate.monthValue,
      this.selectedDay.localDate.year);
    this.newEventDto.description = 'Some description';
    this.newEventDto.title = 'some title' + new Date().getMilliseconds();

    this.http.post(
      this.url + '/event/add',
      this.newEventDto,
      {headers: this.headers}).toPromise()
      .then(res => console.log(res));
    this.updateDay();
  }
  updateDay() {
    this.httpClient.get(this.url + '/' + this.selectedDay.localDate.year + '/' +
      this.selectedDay.localDate.monthValue + '/' + this.selectedDay.localDate.dayOfMonth).toPromise()
      .then(res => {
        this.selectedDay.eventList = res as Event[];
        console.log(this.selectedDay.eventList);
      });
  }
}
