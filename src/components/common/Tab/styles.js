import styled from 'styled-components';
import VAR from '../../../variables';

export const Tab = styled.div`
  background: white;
`;

export const TabHeader = styled.div`
  background: white;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TabMenuItem = styled.div`
  background: white;
  border-bottom: ${({ active }) => active ? `3px solid ${VAR.colors.lightPrimary}` : `1px solid ${VAR.colors.separator}`};
  flex: 1;
  min-width: 0;
  cursor: pointer;
  text-align: center;
  font-size: ${VAR.sizes.relative16};
  padding: 1em;
  cursor: pointer;
`;

export const TabPane = styled.div`
  margin: 0;
  outline: 0;
  padding: 2rem;
  background: white;
`;
