import styled, { css } from 'styled-components';
import Comp from '../Component/index';
// import VAR from '../../../variables';

const Item = styled.div`
  ${Comp};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  ${({ vAlign }) => vAlign === 'top' && css`
    align-items: flex-start;
  `}
`;

Item.Image = styled.div`
  ${Comp};
  padding-right: 1.5rem;
`;

Item.Content = styled.div`
  ${Comp};
`;

Item.Header = styled.div`
  ${Comp};
  margin-bottom: 0.3rem;
`;

Item.Description = styled.div`
  ${Comp};
`;

export default Item;
