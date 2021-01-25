import { SumResult } from '@/type';

export default (numberList: Array<number>, initVal = 0): SumResult => {
  const string: string = numberList.map((number, index) => {
    return {
      sign: (index === 0) ? ((initVal === 0) ? ((number >= 0) ? '' : '-') : ((number >= 0) ? '+' : '-')) : ((number >= 0) ? '+' : '-'),
      value: Math.abs(number).toString()
    };
  }).map(item => item.sign + item.value).join('');
  const value: number = numberList.reduce((a, c) => a + c, initVal);
  const output = (numberList.length > 0) ? (initVal !== 0) ? `${initVal}${string}=${value}` : `${string}=${value}` : 'Please input the array with numbers';

  return {
    value,
    output
  };
};