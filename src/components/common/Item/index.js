import styled, { css } from 'styled-components';
// import VAR from '../../../variables';

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  ${({ vAlign }) => vAlign === 'top' && css`
    align-items: flex-start;
  `}
`;

Item.Image = styled.div`
  padding-right: 1.5rem;
`;

Item.Content = styled.div`
`;

Item.Header = styled.div`
  margin-bottom: 0.3rem;
`;

Item.Description = styled.div`
`;

export default Item;
