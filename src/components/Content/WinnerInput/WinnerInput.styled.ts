import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LabelText = styled.p`
  font-size: ${theme.fontSize.body};
  font-weight: ${theme.fontWeight.body};
  line-height: ${theme.lineHeight.body};
  color: ${theme.color.greyScale5};
`;

export const InputSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const InputLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const InputBox = styled.div`
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  width: 34px;
  height: 36px;
  border: 1px solid rgba(180, 180, 180, 1);
  border-radius: 4px;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

export const Button = styled.button`
  width: 100%;

  padding: 10px;
  border: none;
  border-radius: 4px;

  font-size: ${theme.fontSize.button};
  font-weight: ${theme.fontWeight.button};
  line-height: ${theme.lineHeight.button};

  background-color: ${theme.color.blue};
  color: #ffffff;

  &:disabled {
    background-color: ${theme.color.greyScale4};
    cursor: not-allowed;
  }
`;
