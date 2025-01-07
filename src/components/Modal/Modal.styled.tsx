import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 350px;

  background-color: ${theme.color.greyScale1};
  padding: 32px 16px;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
