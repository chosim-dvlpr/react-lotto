import { useState } from 'react';
import { LOTTO } from '../constants/lotto';
import { validate } from '../utils/validate';

const useValidateInputValue = (initialValue: string) => {
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);

  const validateInputValue = (value: string) => {
    if (!validate.isNumber(value)) {
      setInputValue('');
      setIsValid(false);
      return;
    }

    const numberValue = Number(value);

    if (!validate.isInRange(numberValue, LOTTO.AMOUNT_MIN, LOTTO.AMOUNT_MAX)) {
      setInputValue('');
      setIsValid(false);
      return;
    }
    if (!validate.isInUnit(numberValue)) {
      setInputValue('');
      setIsValid(false);
      return;
    }

    setInputValue(value);
    setIsValid(true);
    return numberValue;
  };

  return { inputValue, validateInputValue, isValid };
};

export default useValidateInputValue;
