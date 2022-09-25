import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZeroDate',
})
export class AddZeroDatePipe implements PipeTransform {
  transform(value: number): unknown {
    if (!(value === undefined)) {
      return ('0' + value).slice(-2);
    }

  }
}
