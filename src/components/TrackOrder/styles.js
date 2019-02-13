import styled from 'styled-components';
import VAR from '../../variables';
import { Button } from '../common/Button/styles';

const Order = styled.div`
  background: ${VAR.colors.background};
  display: flex;
`;

Order.Left = styled.div`
  padding: 2.5rem 0;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 25%;
  
  ${Button} {
    margin-left: 30px;
  }
`;

Order.Middle = styled.div`
  padding: 2.5rem 4rem 2.5rem 0;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 45%;
  &:first-child {
    padding-left: 3rem;
  }
  ${({ width }) => width && `flex: ${width}`}
`;

Order.Right = styled.div`
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 30%;
  ${({ width }) => width && `flex: ${width}`}
`;

Order.Content = styled.div`
`;

Order.Actions = styled.div`
`;

Order.BottomActions = styled.div`
  padding: 2rem;
  text-align: center;
`;

Order.Title = styled.h3`
  font-size: ${VAR.sizes.relative18};
  font-weight: 400;
  margin-bottom: 0;
  text-align: left;
`;

Order.Progress = styled.span`
  font-size: ${VAR.sizes.relative12};
  color: ${VAR.colors.secondTextColor};
  text-transform: uppercase;
  margin-bottom: ${VAR.sizes.relative10};
  display: block;
  text-align: left;
`;

export default Order;
