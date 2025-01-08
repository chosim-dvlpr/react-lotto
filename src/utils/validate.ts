import { LOTTO } from '../constants/lotto';

export const validate = {
  isNumber(value: string) {
    return !Number.isNaN(value);
  },
  isInRange(numberValue: number, min: number, max: number) {
    return numberValue >= min && numberValue <= max;
  },
  isInLength(numbers: string[], count: number) {
    return numbers.length === count;
  },
  isInUnit(numberValue: number) {
    return (
      0 >= numberValue % LOTTO.AMOUNT_MIN ||
      numberValue % LOTTO.AMOUNT_MIN >= LOTTO.AMOUNT_MIN
    );
  },
};
