/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Day } from 'src/app/models/days';

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
  lastEvent;

  monthNumber: number;
  year: number;

  weekDaysName: string[] = [];

  constructor() {
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

  public getMonthName(monthIndex: number): string {
    switch (monthIndex + 1) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';

      default:
        return '|' + monthIndex;
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

  addClass(event?: MouseEvent) {
    console.log(this.lastEvent);
    if (this.lastEvent === undefined) {
      this.lastEvent = event.target;
      this.lastEvent.classList.add('selected');
    } else {
      this.lastEvent.classList.remove('selected');
      console.log(this.lastEvent);

      if (event !== undefined) {
        this.lastEvent = event.target;
      }
      this.lastEvent.classList.add('selected');
    }
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
    this.addClass();
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
    this.addClass();
  }

  chunckArrayInGroups(arr, size): Array<Day[]> {
    const chunk = []; // declara array vacio e indice de for
    for (let i = 0; i <= arr.length; i += size) {
      chunk.push(arr.slice(i, i + size));
    } // push al array el tramo desde el indice del loop hasta el valor size + el indicador
    return chunk;
  }

  private createDay(dayNumber: number, monthIndex: number, year: number) {
    const day = new Day();

    day.monthIndex = monthIndex;
    day.month = this.getMonthName(monthIndex);

    // eslint-disable-next-line id-blacklist
    day.number = dayNumber;
    day.year = year;

    day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();
    day.weekDayName = this.getWeekDayName(day.weekDayNumber);

    return day;
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }
}
