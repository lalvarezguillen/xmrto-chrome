import styled, { css } from 'styled-components';
import VAR, { COLORS } from '../../../variables';

export const InputLabel = styled.div`
  border: 1px solid ${VAR.colors.borderColor};
  border-left: none;
  border-radius: 0 ${VAR.borderRadius}px ${VAR.borderRadius}px 0;
  padding: 0.75rem 1rem;
  transition: box-shadow .2s ease;
  background: white;
  
  ${({ disabled, secondary }) => (disabled || secondary) && css`
    background: #F8F8F8;
    border-left: 1px solid ${VAR.colors.borderColor};
  `}
  
  ${({ error }) => error && css`
    border-color: ${COLORS.red};
  `}
`;

export const InputButton = styled.button`
  border: 1px solid ${VAR.colors.borderColor};
  border-radius: 0 ${VAR.borderRadius}px ${VAR.borderRadius}px 0;
  border-left: none;
  padding: 0.75rem 1rem;
  transition: box-shadow .2s ease;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  line-height: 1;
  
  ${({ primary }) => primary && css`
    background: ${VAR.gradients.primary};
    color: white;
  `}
  
  ${({ disabled, secondary }) => (disabled || secondary) && css`
    background: #F8F8F8;
    border-left: 1px solid ${VAR.colors.borderColor};
    color: ${VAR.colors.secondTextColor};
  `}
  
  ${({ error }) => error && css`
    border-color: ${COLORS.red};
  `}
`;

export const InputWrap = styled.div`
  display: inline-flex;
  outline: 0;
  width: auto;
  
  ${({ fluid }) => fluid && css`
    width: 100%;
  `}
`;

export const Input = styled.input`
  width: auto;
  border: 1px solid ${VAR.colors.borderColor};
  border-radius: ${VAR.borderRadius}px;
  padding: 0.75rem 1rem;
  transition: box-shadow .2s ease;
  background: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  
  ${({ hasLabel }) => hasLabel && css`
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `}
  
  ${({ fluid }) => fluid && css`
    width: 100%;
  `}
  
  ${({ error }) => error && css`
    border-color: ${COLORS.red};
  `}
  
  ${({ disabled }) => disabled && css`
    background: #F8F8F8;
  `}
  
  ::placeholder {
    color: ${VAR.colors.placeholderColor};
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: ${VAR.colors.placeholderColor};
  }
 
  ::-ms-input-placeholder {
    color: ${VAR.colors.placeholderColor};
  }
  &:focus {
    border-color: ${COLORS.primarySuperLight};
    box-shadow: ${COLORS.primaryShadow};
    
    & + ${InputLabel} {
      border-color: ${COLORS.primarySuperLight};
    }
  }
`;

Input.defaultProps = {
  fluid: false,
};
