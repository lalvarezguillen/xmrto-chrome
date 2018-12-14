import styled, { css, keyframes } from 'styled-components';
import Comp from '../Component';


export const StyledLoader = styled.div`
  ${Comp};
  margin: 20px auto;
  width: 100%;
  text-align: center;
  
  ${({ cover, dimmer }) => cover && css`
    margin: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
      ${dimmer ? css`content: '';` : ''}
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: white;
      opacity: 0.8;
      z-index: 1;
    }
  `}
`;

const bounceDelay = keyframes`
  0%, 80%, 100% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.3);
  }
`;


export const StyledLoaderBounce = styled.div`
  ${Comp};
  width: 6px;
  height: 6px;
  margin-right: 7px;
  background-color: #acb1b9;
  position: relative;
  z-index: 2;

  border-radius: 100%;
  display: inline-block;
  animation: ${bounceDelay} 1s infinite ease-in-out both;
  
  ${({ index }) => css`
    animation-delay: ${-0.64 + (0.16 * index)}s;
  `};
`;
