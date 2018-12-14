import styled from 'styled-components';
import VAR from '../../../variables';

export default styled.div`
  border: 1px solid ${VAR.colors.borderColor};
  border-radius: ${VAR.borderRadius}px;
  color: ${VAR.colors.lightPrimary};
  font-family: monospace;
  font-size: 13px;
  padding: 1rem;
  resize: none;
  width: 100% !important;
  background: white;
  word-break: break-all;
`;
