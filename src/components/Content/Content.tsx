import { ChangeEvent, useEffect, useRef } from 'react';
import * as S from './Content.styled';
import Numbers from './Numbers/Numbers';
import useLottoContext from '../../hooks/useLottoContext';
import WinnerInput from './WinnerInput/WinnerInput';
import useValidateInputValue from '../../hooks/useValidateInputValue';
import { getRandomNumbers } from '../../utils/getRandomNumbers';

function Content() {
  const {
    inputAmountValue,
    setInputAmountValue,
    lottoNumbers,
    setLottoNumbers,
    setLottoCount,
  } = useLottoContext();
  const { validateInputValue, isValid, inputValue } =
    useValidateInputValue(inputAmountValue);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const count = Number(inputValue) / 1000;
    setLottoNumbers(getRandomNumbers(count));
    setLottoCount(count);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputAmountValue(event.target.value);
    validateInputValue(event.target.value);
  };

  return (
    <S.Layout>
      <S.SubTitleText>🎱 내 번호 당첨 확인 🎱</S.SubTitleText>
      <form onSubmit={handleSubmit}>
        <S.InputBox>
          <S.InputLabelText>구입할 금액을 입력해주세요.</S.InputLabelText>
          <S.InputButtonBox>
            <S.Input
              autoFocus
              type="number"
              placeholder="금액"
              value={inputAmountValue}
              onChange={handleInputChange}
            />
            <S.InputButton type="submit" disabled={!isValid}>
              구입
            </S.InputButton>
          </S.InputButtonBox>
        </S.InputBox>
      </form>

      {isValid && Object.keys(lottoNumbers).length > 0 && (
        <>
          <Numbers />
          <WinnerInput />
        </>
      )}
    </S.Layout>
  );
}

export default Content;
