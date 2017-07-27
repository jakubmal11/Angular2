import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DayWithEvents} from '../day-with-events';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css']
})
@Injectable()
export class CalendarComponentComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  daysWithEvents: DayWithEvents[];
  days: DayWithEvents[][] = [];
  help: DayWithEvents[] = [];
  ngOnInit() {
    this.getDays();
  }

  getDays(): void {
    this.http.get('http://localhost:8080/calendar/' + this.currentYear + '/' + this.currentMonth).toPromise()
      .then(res => {
      console.log(res);
      this.daysWithEvents = res as DayWithEvents[];
      for (let i = 0; i < this.daysWithEvents.length; i++) {
        this.daysWithEvents[i].id = i;
      }
      for (let i = 0; i < 42; i++) {
        this.help.push(this.daysWithEvents[i]);
        console.log(i);
        if (i % 7 === 6) {
          this.days.push(this.help);
          this.help = [];
        }
      }
      console.log(this.days);
    });
  }
  loadNextMonth() {
    this.clear();
    this.currentMonth += 1;
    this.getDays();
  }
  loadPreviousMonth() {
    this.clear();
    this.currentMonth -= 1;
    this.getDays();
  }
  clear() {
    this.days = [];
    this.help = [];
  }
}
