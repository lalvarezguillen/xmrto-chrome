import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tooltip from '../common/Tooltip';
import Icon from '../common/Icon';
import VAR, { COLORS } from '../../variables';
import Comp from '../common/Component';
import config from '../../config';

const calculateTime = (amount) => {
  for (let i = 0; i < config.num_xmr_confirmations.length; i += 1) {
    const condition = config.num_xmr_confirmations[i];
    if (amount > condition.min && amount <= condition.max) {
      return condition.confirmations * config.block_time;
    }
  }
  return 0;
};

// console.log(calculateTime(0.01), 'should be 0');
// console.log(calculateTime(0.1), 'should be 0');
// console.log(calculateTime(0.2), 'should be 2');
// console.log(calculateTime(5), 'should be 2');
// console.log(calculateTime(6), 'should be 4');
// console.log(calculateTime(10), 'should be 4');
// console.log(calculateTime(11), 'should be 6');
// console.log(calculateTime(20), 'should be 8');
// console.log(calculateTime(30), 'should be 10');

const StyledRate = styled.div`
  ${Comp};
  background: rgba(245,245,245,0.7);
  padding: 1rem;
`;

StyledRate.Row = styled.div`
  ${Comp};
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Rate = ({ bitcoinAddress, price, btcAmount, maxAmount, lowerLimit, upperLimit }) => (
  <StyledRate>
    {
      bitcoinAddress && (
        <StyledRate.Row>
          <div className="fz12 secondaryText">Destination Address</div>
          <div className="breakWord primaryText">
            {bitcoinAddress}
          </div>
        </StyledRate.Row>
      )
    }
    <StyledRate.Row>
      <div className="fz12 secondaryText">Indicative exchange rate</div>
      <div>1 XMR = {price} BTC</div>
    </StyledRate.Row>
    <StyledRate.Row>
      <div className="fz12 secondaryText">Operation Limit</div>
      <div>{lowerLimit} BTC &mdash; {upperLimit} BTC</div>
    </StyledRate.Row>
    <StyledRate.Row>
      <div className="fz12 secondaryText">
        Est. time to send BTC &nbsp;
        <Tooltip
          content={(
            <div style={{ width: '220px' }}>
              Estimated time for us to send your bitcoins,
              after we received your moneroj and waited for a
              appropriate number of confirmations.
            </div>
          )}
        >
          <Icon name="info" color={VAR.colors.secondTextColor} />
        </Tooltip>
      </div>
      <div>{ btcAmount <= maxAmount ? <span style={{ color: COLORS.violet }}>instant</span> : `${calculateTime(btcAmount)} minutes`}</div>
    </StyledRate.Row>
  </StyledRate>
);

Rate.propTypes = {
  bitcoinAddress: PropTypes.string,
  price: PropTypes.number,
  btcAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  lowerLimit: PropTypes.number,
  upperLimit: PropTypes.number,
};

Rate.defaultProps = {
  bitcoinAddress: '',
  price: 0,
  btcAmount: 0,
  maxAmount: 0,
  lowerLimit: 0,
  upperLimit: 0,
};

export default Rate;

export { StyledRate as Statistic };
