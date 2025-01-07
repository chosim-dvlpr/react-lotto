import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  width: 414px;
  height: 727px;

  margin: 84px auto 69px;
  padding: 32px 16px;

  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: ${theme.color.greyScale1};
`;

export const SubTitleText = styled.h2`
  font-size: ${theme.fontSize.title};
  font-weight: ${theme.fontWeight.title};
  line-height: ${theme.lineHeight.title};
  color: ${theme.color.greyScale5};
  text-align: center;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const InputButtonBox = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

export const InputLabelText = styled.p`
  font-size: ${theme.fontSize.body};
  font-weight: ${theme.fontWeight.body};
  line-height: ${theme.lineHeight.body};
  color: ${theme.color.greyScale5};
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;

  border: 1px solid rgba(180, 180, 180, 1);
  border-radius: 4px;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

export const InputButton = styled.button`
  padding: 10px 13px;

  font-size: ${theme.fontSize.button};
  font-weight: ${theme.fontWeight.button};
  line-height: ${theme.lineHeight.button};
  white-space: nowrap;

  border: none;
  border-radius: 4px;
  background-color: ${theme.color.blue};
  color: #ffffff;

  &:disabled {
    background-color: ${theme.color.greyScale3};
    cursor: not-allowed;
  }
`;
