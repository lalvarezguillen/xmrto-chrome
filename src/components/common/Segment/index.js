import styled, { css } from 'styled-components';
import VAR from '../../../variables';


const Segment = styled.div`
  padding: 1rem;
  border-radius: ${VAR.borderRadius}px;
  background: ${({ highlighted }) => highlighted ? VAR.colors.hghlBackground : VAR.colors.background};
  
  ${({ positive }) => positive && css`
    background-color: rgba(71,207,118,0.07);
  `}
`;

Segment.defaultProps = {
  highlighted: false,
};

export default Segment;
