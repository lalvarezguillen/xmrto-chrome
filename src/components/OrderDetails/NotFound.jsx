import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderStatus from './OrderStatus';
import Button from '../common/Button';

export default class NotFound extends Component {
  static propTypes = {
    order: PropTypes.shape({
      uuid: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
  };
  render() {
    const { order: { uuid, state } } = this.props;
    return (
      <div className="relative">
        <div className="block">
          <OrderStatus uuid={uuid} state={state} />
        </div>
      </div>
    );
  }
}
