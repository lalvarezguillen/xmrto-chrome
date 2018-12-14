import React from 'react';
import PropTypes from 'prop-types';
import Item from '../common/Item';
import Segment from '../common/Form';
import IconProcessing from './processing.svg';
import IconSuccess from './success.svg';
import IconError from './error.svg';

const statuses = {
  PAID_UNCONFIRMED: {
    icon: IconProcessing,
    title: 'We are processing your order',
  },
  PAID: {
    icon: IconProcessing,
    title: 'We are processing your order',
  },
  BTC_SENT: {
    icon: IconSuccess,
    title: 'Your order is complete',
  },
  TIMED_OUT: {
    icon: IconError,
    title: 'Order time is out',
  },
  NOT_FOUND: {
    icon: IconError,
    title: 'Order doesn’t exist',
  },
};

const OrderStatus = ({ state, uuid }) => (
  <Segment positive>
    <Item>
      <Item.Image>
        <img
          width={56}
          height={56}
          src={statuses[state] ? statuses[state].icon : ''}
          alt="code"
        />
      </Item.Image>
      <Item.Content>
        <Item.Description>
          <div className="fz15">
            <div className="fz12 secondaryText">Order Secret Key &mdash; {uuid}</div>
            <div className="fz20">{statuses[state] ? statuses[state].title : ''}</div>
          </div>
        </Item.Description>
      </Item.Content>
    </Item>
  </Segment>
);

OrderStatus.propTypes = {
  state: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default OrderStatus;
