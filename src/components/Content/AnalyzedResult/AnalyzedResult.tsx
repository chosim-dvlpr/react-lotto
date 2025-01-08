import * as S from './AnalyzedResult.styled';
import { useCallback, useMemo } from 'react';
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

  const results = useMemo<ResultsType[]>(() => {
    return Object.values(lottoNumbers).map((values: number[]) => {
      const matchCount = values.filter((value: number) =>
        winningNumbers.includes(String(value)),
      ).length;
      const isBonus = values.includes(Number(bonusNumber));
      return { matchCount, isBonus };
    });
  }, [lottoNumbers, winningNumbers, bonusNumber]);

  const rankResult = useMemo<ResultType>(() => {
    return results.reduce(
      (acc, { matchCount, isBonus }) => {
        if (isBonus && matchCount === 5) acc.bonus += 1;
        else if (matchCount === 6) acc['6'] += 1;
        else if (matchCount === 5) acc['5'] += 1;
        else if (matchCount === 4) acc['4'] += 1;
        else if (matchCount === 3) acc['3'] += 1;
        return acc;
      },
      { ...INITIAL_RESULT_VALUE },
    );
  }, [results]);

  const isResultTypeKey = useCallback(
    (key: string): key is keyof ResultType => {
      return Object.keys(rankResult).includes(key);
    },
    [rankResult],
  );

  const totalProfit = useMemo(() => {
    return Object.entries(rankResult).reduce((profit, [key, count]) => {
      if (isResultTypeKey(key)) {
        return profit + (PRIZE_MONEY.get(key) ?? 0) * count;
      }
      return profit;
    }, 0);
  }, [rankResult, isResultTypeKey]);

  const calculateYield = useMemo(() => {
    const totalInvestment = parseInt(inputAmountValue, 10) ?? 0;
    return totalInvestment > 0
      ? ((totalProfit - totalInvestment) / totalInvestment) * 100
      : 0;
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
          {[...PRIZE_MONEY.entries()].map(([key, prize]) => (
            <S.Tr key={key}>
              <S.Td>{key === 'bonus' ? '5개+보너스볼' : `${key}개`}</S.Td>
              <S.Td>{prize.toLocaleString()}원</S.Td>
              <S.Td>{isResultTypeKey(key) ? rankResult[key] : 0}개</S.Td>
            </S.Tr>
          ))}
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
