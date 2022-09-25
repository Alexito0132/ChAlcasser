import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { EnumeratePipe } from '../../pipes/enumerate.pipe';
import { AddZeroDatePipe } from '../../pipes/add-zero-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule
  ],
  declarations: [CalendarioPage, EnumeratePipe, AddZeroDatePipe]
})
export class CalendarioPageModule {}
