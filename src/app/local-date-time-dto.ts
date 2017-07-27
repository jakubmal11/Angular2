export class LocalDateTimeDto {
  constructor(min: number, hour: number, day: number, month: number, year: number) {
    this.min = min;
    this.hour = hour;
    this.day = day;
    this.month = month;
    this.year = year;
  }

  min: number;
  hour: number;
  day: number;
  month: number;
  year: number;
}
