import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  @Input() backgroundImage;
  @Input() title;
  @Input() eventDate!: Date;
  month = '';
  day: string;
  time = '';

  constructor() {}

  ngOnInit() {
    this.month = this.eventDate
      .toLocaleString('default', { month: 'long' })
      .slice(0, 3);

    this.day = ('0' + this.eventDate.getDate()).slice(-2);
    this.time = ('0' + this.eventDate.getHours()).slice(-2) + ':' + ('0' + this.eventDate.getMinutes()).slice(-2);
  }
}
