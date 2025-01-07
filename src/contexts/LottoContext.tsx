import { createContext, useState } from 'react';
import { RandomNumbersType } from '../types/randomNumbers';

interface LottoContextProps {
  inputAmountValue: string;
  setInputAmountValue: React.Dispatch<React.SetStateAction<string>>;
  lottoNumbers: RandomNumbersType;
  lottoCount: number;
  setLottoNumbers: React.Dispatch<React.SetStateAction<RandomNumbersType>>;
  setLottoCount: React.Dispatch<React.SetStateAction<number>>;
  winningNumbers: string[];
  bonusNumber: string;
  setWinningNumbers: React.Dispatch<React.SetStateAction<string[]>>;
  setBonusNumber: React.Dispatch<React.SetStateAction<string>>;
}

const LottoContext = createContext<LottoContextProps | undefined>(undefined);

export const LottoProvider = ({ children }: React.PropsWithChildren) => {
  const [inputAmountValue, setInputAmountValue] = useState('');
  const [lottoNumbers, setLottoNumbers] = useState<RandomNumbersType>({});
  const [lottoCount, setLottoCount] = useState<number>(0);
  const [winningNumbers, setWinningNumbers] = useState(Array(6).fill(''));
  const [bonusNumber, setBonusNumber] = useState('');

  return (
    <LottoContext.Provider
      value={{
        inputAmountValue,
        setInputAmountValue,
        lottoNumbers,
        lottoCount,
        setLottoNumbers,
        setLottoCount,
        winningNumbers,
        setWinningNumbers,
        bonusNumber,
        setBonusNumber,
      }}
    >
      {children}
    </LottoContext.Provider>
  );
};

export default LottoContext;
