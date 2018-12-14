import styled, { css, keyframes } from 'styled-components';
import Comp from '../Component/index';
import VAR, { COLORS } from '../../../variables';

const buttonSpin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// eslint-disable-next-line
export const Button = styled.button`
  ${Comp};
  text-align: center;
  margin: 0 0.3rem 0 0;
  line-height: 1.25;
  background: white;
  color: ${VAR.colors.lightPrimary};
  border: 1px solid ${VAR.colors.lightPrimary};
  padding: 0.536rem 2.4rem;
  font-size: ${VAR.sizes.relative12};
  border-radius: 28px;
  transition: box-shadow 0.2s;
  cursor: pointer;
  width: auto;
  position: relative;
  &::before {
    display: none;
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    margin: -10px -10px;
    width: 16px;
    height: 16px;
    animation: ${buttonSpin} .6s linear;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: rgba(34,48,66,0.1) rgba(34,48,66,0.1) transparent;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 1px transparent;
  }
  &:focus {
    border-color: ${VAR.colors.primary};
  }
  &:hover {
    box-shadow: ${VAR.shadows.primary};
  }
  
  ${({ loading }) => loading && css`
    color: transparent !important;
    &::before {
      display: block;
    }
  `}
  
  ${({ fluid }) => fluid && css`
    width: 100%;
  `}
  
  ${({ primary }) => primary && css`
    background: ${VAR.gradients.primary};
    color: white;
    border-color: transparent;
    &::before {
      border-color: #fff #fff transparent;
    }
    &:focus {
      border-color: ${COLORS.red};
    }
    &:hover {
      box-shadow: ${VAR.shadows.primary};
    }
  `}
  
  ${({ secondary }) => secondary && css`
    background: white;
    color: ${COLORS.grey[90]};
    border-color: ${VAR.colors.borderColor};
    &:focus {
      border-color: ${VAR.colors.focusedBorderColor};
    }
    &:hover {
      box-shadow: 0 2px 10px 0 #F2F2F2;
    }
  `}
  
  ${({ disabled }) => disabled && css`
    background: #F8F8F8;
    color: ${COLORS.grey[40]};
    border-color: ${VAR.colors.borderColor};
    cursor: default;
    &::before {
      border-color: rgba(34,48,66,0.1) rgba(34,48,66,0.1) transparent;
    }
    &:focus {
      border-color: ${VAR.colors.focusedBorderColor};
    }
    &:hover {
      box-shadow: none;
    }
  `}
  
  // SIZES
  
  ${({ size }) => (size === 'small') && css`
    padding: 0.322rem 1.65rem;
    font-size: ${VAR.sizes.relative12};
    border-radius: 18px;
  `}
  
  ${({ size }) => (size === 'big') && css`
    padding: 0.75rem 2.8rem;
    font-size: ${VAR.sizes.relative14};
    border-radius: 28px;
  `}
`;

Button.defaultProps = {
  fluid: false,
};
