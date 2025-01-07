import { LOTTO } from '../constants/lotto';

export const validate = {
  isNumber(value: string) {
    if (Number.isNaN(value)) {
      return false;
    }
    return true;
  },
  isInRange(numberValue: number, min: number, max: number) {
    if (numberValue < min || numberValue > max) {
      return false;
    }
    return true;
  },
  isInLength(numbers: string[], count: number) {
    if (numbers.length !== count) {
      return false;
    }
    return true;
  },
  isInUnit(numberValue: number) {
    if (
      0 < numberValue % LOTTO.AMOUNT_MIN &&
      numberValue % LOTTO.AMOUNT_MIN < LOTTO.AMOUNT_MIN
    ) {
      return false;
    }
    return true;
  },
};
