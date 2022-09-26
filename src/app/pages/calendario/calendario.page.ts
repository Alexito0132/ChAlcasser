/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Day } from 'src/app/models/days';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  currentYear: number;
  currentMonthIndex: number;
  monthDays: Day[];
  groupMonthDays: Array<Day[]>;
  rows = 0;
  lastEvent: Day;

  monthNumber: number;
  year: number;

  weekDaysName: string[] = [];

  constructor(private translate: TranslateService) {
    const date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth();
  }

  ngOnInit(): void {
    this.setMonthDays(this.getCurrentMonth());

    this.weekDaysName.push('Lunes');
    this.weekDaysName.push('Martes');
    this.weekDaysName.push('miercoles');
    this.weekDaysName.push('jueves');
    this.weekDaysName.push('viernes');
    this.weekDaysName.push('sabado');
    this.weekDaysName.push('domingo');

    this.rows = Math.ceil(this.monthDays.length / 7);
    this.groupMonthDays = this.chunckArrayInGroups(this.monthDays, 7);
    const date = new Date();

    const index = this.getIndexOf(this.groupMonthDays, date.getDate());
    this.addClass(this.groupMonthDays[index[0]][index[1]]);
  }

  public getCurrentMonth(): Day[] {
    return this.getMonth(this.currentMonthIndex, this.currentYear);
  }

  public getMonth(monthIndex: number, year: number): Day[] {
    const days = [];

    const firstday = this.createDay(1, monthIndex, year);

    //create empty days
    for (let i = 1; i < firstday.weekDayNumber; i++) {
      days.push({
        weekDayNumber: i,
        monthIndex,
        year,
      } as Day);
    }
    days.push(firstday);
    //

    const countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 2; i < countDaysInMonth + 1; i++) {
      days.push(this.createDay(i, monthIndex, year));
    }

    return days;
  }

  public getMonthName(monthIndex: number): Observable<any> {
    switch (monthIndex + 1) {
      case 1:
        return this.translate.get('calendar.month.january');
      case 2:
        return this.translate.get('calendar.month.february');
      case 3:
        return this.translate.get('calendar.month.march');
      case 4:
        return this.translate.get('calendar.month.april');
      case 5:
        return this.translate.get('calendar.month.may');
      case 6:
        return this.translate.get('calendar.month.june');
      case 7:
        return this.translate.get('calendar.month.july');
      case 8:
        return this.translate.get('calendar.month.august');
      case 9:
        return this.translate.get('calendar.month.september');
      case 10:
        return this.translate.get('calendar.month.october');
      case 11:
        return this.translate.get('calendar.month.november');
      case 12:
        return this.translate.get('calendar.month.december');

      default:
        return of('|' + monthIndex);
    }
  }

  public getWeekDayName(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return 'Su'; // Sunday
      case 1:
        return 'Mo'; // Monday
      case 2:
        return 'Tu'; // Tuesday
      case 3:
        return 'We'; // Wednesday
      case 4:
        return 'Th'; // Thursday
      case 5:
        return 'Fr'; // Friday
      case 6:
        return 'Sa'; // Saturday

      default:
        return '';
    }
  }

  addClass(day: Day) {
    if (this.lastEvent) {
      this.lastEvent.selected = false;
      this.lastEvent = day;
      day.selected = true;
    } else {
      this.lastEvent = day;
      day.selected = true;
    }
  }

  searchDay(day: Day) {
    if (day === undefined) {
      return;
    }
    let index = this.getIndexOf(this.groupMonthDays, day.number);

    while (index === undefined) {
      // eslint-disable-next-line id-blacklist
      day.number -= 1;
      index = this.getIndexOf(this.groupMonthDays, day.number);
    }

    this.addClass(this.groupMonthDays[index[0]][index[1]]);
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber === 13) {
      this.monthNumber = 1;
      this.year++;
    }

    this.setMonthDays(this.getMonth(this.monthNumber, this.year));
    this.rows = Math.ceil(this.monthDays.length / 7);
    this.groupMonthDays = this.chunckArrayInGroups(this.monthDays, 7);
    this.searchDay(this.lastEvent);
  }

  onPreviousMonth(): void {
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
    }

    this.setMonthDays(this.getMonth(this.monthNumber, this.year));
    this.rows = Math.ceil(this.monthDays.length / 7);
    this.groupMonthDays = this.chunckArrayInGroups(this.monthDays, 7);
    this.searchDay(this.lastEvent);
  }

  chunckArrayInGroups(arr, size): Array<Day[]> {
    const chunk = []; // declara array vacio e indice de for
    for (let i = 0; i <= arr.length; i += size) {
      chunk.push(arr.slice(i, i + size));
    } // push al array el tramo desde el indice del loop hasta el valor size + el indicador
    return chunk;
  }

  getIndexOf(arr: Array<Day[]>, day: number) {
    for (let i = 0; i < arr.length; i++) {
      const index = arr[i].findIndex((d) => d.number === day);
      if (index > -1) {
        return [i, index];
      }
    }
  }

  private createDay(dayNumber: number, monthIndex: number, year: number) {
    const day = new Day();

    day.monthIndex = monthIndex;
    this.getMonthName(monthIndex).subscribe((data) => (day.month = data));

    // eslint-disable-next-line id-blacklist
    day.number = dayNumber;
    day.year = year;

    day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();
    day.weekDayName = this.getWeekDayName(day.weekDayNumber);
    day.selected = false;

    return day;
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }
}
