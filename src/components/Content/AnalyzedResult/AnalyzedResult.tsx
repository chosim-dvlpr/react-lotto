import * as S from './AnalyzedResult.styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useLottoContext from '../../../hooks/useLottoContext';
import { PRIZE_MONEY } from '../../../constants/lotto';

interface AnalyzedResultProps {
  onClose: () => void;
}

interface ResultsType {
  matchCount: number;
  isBonus: boolean;
}

interface ResultType {
  '6': number;
  '5': number;
  bonus: number;
  '4': number;
  '3': number;
}

const INITIAL_RESULT_VALUE = {
  '6': 0,
  '5': 0,
  bonus: 0,
  '4': 0,
  '3': 0,
};

function AnalyzedResult({ onClose }: AnalyzedResultProps) {
  const { lottoNumbers, winningNumbers, bonusNumber, inputAmountValue } =
    useLottoContext();
  const [result, setResult] = useState<ResultType>(INITIAL_RESULT_VALUE);

  const isResultTypeKey = (key: string): key is keyof ResultType => {
    return Object.keys(result).includes(key);
  };

  const calculateResults = useMemo(() => {
    return Object.values(lottoNumbers).map((values) => {
      const matchCount = values.reduce((acc: number, value: number) => {
        if (winningNumbers.includes(String(value))) {
          return acc + 1;
        }
        return acc;
      }, 0);
      const isBonus = values.includes(bonusNumber);
      return { matchCount, isBonus };
    });
  }, [lottoNumbers, winningNumbers, bonusNumber]);

  const handleResult = useCallback((results: ResultsType[]) => {
    const updatedResult = { ...INITIAL_RESULT_VALUE };
    results.forEach(({ matchCount, isBonus }) => {
      if (isBonus && matchCount === 5) {
        updatedResult.bonus += 1;
      } else if (matchCount === 6) {
        updatedResult['6'] += 1;
      } else if (matchCount === 5) {
        updatedResult['5'] += 1;
      } else if (matchCount === 4) {
        updatedResult['4'] += 1;
      } else if (matchCount === 3) {
        updatedResult['3'] += 1;
      }
    });
    setResult(updatedResult);
  }, []);

  useEffect(() => {
    const results = calculateResults;
    handleResult(results);
  }, []);

  const calculateProfit = (result: ResultType) => {
    let totalProfit = 0;
    Object.entries(result).forEach(([key, count]) => {
      if (isResultTypeKey(key)) {
        const prize = PRIZE_MONEY[key] ?? 0;
        totalProfit += prize * count;
      }
    });

    return totalProfit;
  };

  const totalProfit = useMemo(() => calculateProfit(result), [result]);
  const calculateYield = useMemo(() => {
    const totalInvestment = parseInt(inputAmountValue, 10) ?? 0;
    return Math.max(
      0,
      ((totalProfit - totalInvestment) / totalInvestment) * 100,
    );
  }, [totalProfit, inputAmountValue]);

  return (
    <S.Layout>
      <S.Title>🏆 당첨 통계 🏆</S.Title>
      <S.Table>
        <S.Thead>
          <tr>
            <S.Th>일치 갯수</S.Th>
            <S.Th>당첨금</S.Th>
            <S.Th>당첨 갯수</S.Th>
          </tr>
        </S.Thead>
        <tbody>
          <S.Tr>
            <S.Td>3개</S.Td>
            <S.Td>{PRIZE_MONEY[3].toLocaleString()}</S.Td>
            <S.Td>{result[3]}개</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>4개</S.Td>
            <S.Td>{PRIZE_MONEY[4].toLocaleString()}</S.Td>
            <S.Td>{result[4]}개</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>5개</S.Td>
            <S.Td>{PRIZE_MONEY[5].toLocaleString()}</S.Td>
            <S.Td>{result[5]}개</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>5개+보너스볼</S.Td>
            <S.Td>{PRIZE_MONEY.bonus.toLocaleString()}</S.Td>
            <S.Td>{result.bonus}개</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>6개</S.Td>
            <S.Td>{PRIZE_MONEY[6].toLocaleString()}</S.Td>
            <S.Td>{result[6]}개</S.Td>
          </S.Tr>
        </tbody>
      </S.Table>
      <S.YieldText>
        당신의 총 수익률은 {calculateYield.toFixed(2).toLocaleString()}
        %입니다.
      </S.YieldText>

      <S.Button onClick={onClose}>다시 시작하기</S.Button>
    </S.Layout>
  );
}

export default AnalyzedResult;
