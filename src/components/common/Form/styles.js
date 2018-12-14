import styled, { css } from 'styled-components';
import Comp from '../Component';
import VAR from '../../../variables';

export const Form = styled.form`
  ${Comp}
`;

export const FormField = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: ${VAR.sizes.relative12};
    color: ${VAR.colors.secondTextColor}
  }
  
  ${({ inline }) => inline && css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    
    label {
      display: block;
      margin-top: ${VAR.sizes.relative12};
      margin-right: 1rem;
    }
  `}
`;
