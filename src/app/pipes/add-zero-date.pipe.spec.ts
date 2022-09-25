import { AddZeroDatePipe } from './add-zero-date.pipe';

describe('AddZeroDatePipe', () => {
  it('create an instance', () => {
    const pipe = new AddZeroDatePipe();
    expect(pipe).toBeTruthy();
  });
});
