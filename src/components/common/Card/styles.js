import styled, { css } from 'styled-components';
import Comp from '../Component/index';
import VAR from '../../../variables';

export const Card = styled.div`
  ${Comp}
  width: ${props => props.fluid ? '100%' : 'auto'};
  background: white;
  box-shadow: ${VAR.shadows.secondary};
  display: inline-block;
  border-radius: ${VAR.borderRadius}px;
  border: 1px solid ${VAR.colors.separator};
  //overflow: hidden;
`;

export const CardContent = styled.div`
  margin: 0;
  padding: 1.5rem 1.5rem;
  width: 100%;
  background: ${({ extra }) => extra ? VAR.colors.background : 'white'};
  
  ${({ compact }) => compact && css`
    padding: 0;
  `}
  &:not(:last-child) {
    background: ${props => props.extra ? VAR.colors.background : 'white'};
    border: none;
    border-bottom: 1px solid ${VAR.colors.separator};
  }
`;

Card.defaultProps = {
  fluid: false,
};
