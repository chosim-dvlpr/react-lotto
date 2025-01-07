import * as S from './WinnerInput.styled';
import useLottoContext from '../../../hooks/useLottoContext';
import useValidateRange from '../../../hooks/useValidateRange';
import useValidateNumbersLength from '../../../hooks/useValidateNumbersLength';
import useValidateNumber from '../../../hooks/useValidateNumber';
import { LOTTO } from '../../../constants/lotto';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import AnalyzedResult from '../AnalyzedResult/AnalyzedResult';

function WinnerInput() {
  const {
    winningNumbers,
    bonusNumber,
    setWinningNumbers,
    setBonusNumber,
    setInputAmountValue,
  } = useLottoContext();
  const { validateNumber } = useValidateNumber();
  const { validateRange } = useValidateRange();
  const { validateNumbersLength } = useValidateNumbersLength();
  const { openModal, closeModal, isModalOpen } = useModal();

  const handleWinningNumberChange = (index: number, value: string) => {
    setWinningNumbers((prev) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index + 1),
    ]);
  };

  const checkWinningNumbers = () => {
    const isValid =
      winningNumbers.every(
        (number) =>
          validateNumber(number) &&
          validateRange(Number(number), LOTTO.MIN, LOTTO.MAX),
      ) &&
      validateNumbersLength(winningNumbers, LOTTO.COUNT) &&
      new Set(winningNumbers).size === LOTTO.COUNT;

    return isValid;
  };

  const checkBonusNumber = () => {
    const isValid =
      validateNumber(bonusNumber) &&
      validateRange(Number(bonusNumber), LOTTO.MIN, LOTTO.MAX) &&
      validateNumbersLength([bonusNumber], LOTTO.MIN_COUNT) &&
      !winningNumbers.includes(bonusNumber);

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 당첨 번호 검증
    if (!checkWinningNumbers()) {
      alert('정확한 당첨 번호를 입력해 주세요!');
      return;
    }

    // 보너스 번호 검증
    if (!checkBonusNumber()) {
      alert('정확한 보너스 번호를 입력해 주세요!');
      return;
    }

    openModal();
  };

  const handleCloseModal = () => {
    setInputAmountValue('');
    setWinningNumbers([]);
    setBonusNumber('');
    closeModal();
    window.location.reload();
  };

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <S.LabelText>
          지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
        </S.LabelText>
        <S.InputSection>
          <S.InputLeft>
            <S.LabelText>당첨 번호</S.LabelText>
            <S.InputBox>
              {winningNumbers.map((number, index) => (
                <S.Input
                  key={index}
                  value={number}
                  type="number"
                  onChange={(e) =>
                    handleWinningNumberChange(index, e.target.value)
                  }
                />
              ))}
            </S.InputBox>
          </S.InputLeft>
          <S.InputRight>
            <S.LabelText>보너스 번호</S.LabelText>
            <S.Input
              value={bonusNumber}
              type="number"
              onChange={(e) => setBonusNumber(e.target.value)}
            />
          </S.InputRight>
        </S.InputSection>

        <S.Button type="submit">결과 확인하기</S.Button>
      </S.Form>

      <Modal isOpen={isModalOpen}>
        <AnalyzedResult onClose={handleCloseModal} />
      </Modal>
    </>
  );
}

export default WinnerInput;
