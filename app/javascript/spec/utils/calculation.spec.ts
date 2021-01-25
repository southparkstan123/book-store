import calculation from '@/utils/calculation';

describe('calculation.ts', () => {
  it('should not calculate when the array is empty', () => {
    const arr: Array<number> = [];
    const result = calculation(arr);

    expect(result.output).toEqual('Please input the array with numbers');
    expect(result.value).toEqual(0);
  });

  it('should calculate the result without initial value and the first element of array is positive', () => {
    const arr: number = [1, 2, 3];
    const result = calculation(arr);

    expect(result.output).toEqual('1+2+3=6');
    expect(result.value).toEqual(6);
  });

  it('should calculate the result without initial value and the first element of array is negative', () => {
    const arr: number = [-1, 2, 3];
    const result = calculation(arr);

    expect(result.output).toEqual('-1+2+3=4');
    expect(result.value).toEqual(4);
  });

  it('should calculate the result with initial value', () => {
    const arr: number = [2, 3];
    const initValue: number = 1;
    const result = calculation(arr, initValue);

    expect(result.output).toEqual('1+2+3=6');
    expect(result.value).toEqual(6);
  });

  it('should calculate the result with negative value in the array', () => {
    const arr: number = [-2, 3];
    const initValue: number = 1;
    const result = calculation(arr, initValue);

    expect(result.output).toEqual('1-2+3=2');
    expect(result.value).toEqual(2);
  });

  it('should calculate the result with negative value in the array and negative initial value', () => {
    const arr: number = [-2, 3];
    const initValue: number = -1;
    const result = calculation(arr, initValue);

    expect(result.output).toEqual('-1-2+3=0');
    expect(result.value).toEqual(0);
  });
});
