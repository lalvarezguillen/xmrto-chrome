import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/Card';
import AppStatus from '../AppStatus';
import CreateOrder from '../CreateOrder';
import OrderDetails from '../OrderDetails';
import './styles.scss';

/**
 * Form
 * Home page form
 */
export default class Layout extends Component {
  static propTypes = {
    usePP: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    netType: PropTypes.string.isRequired,
    params: PropTypes.shape({}).isRequired,
    order: PropTypes.shape({ state: PropTypes.string }).isRequired,
    fetchOrder: PropTypes.func,
    createOrder: PropTypes.func,
  };
  render() {
    const {
      usePP,
      address,
      netType,
      params: { status: appStatus },
      order: { state },
      createOrder,
      fetchOrder,
    } = this.props;
    return (
      <Card fluid>
        <Card.Content compact>
          <AppStatus status={appStatus}>
            <div className="layout">
              <div className="layout__logo" />
              {
                !state ? (
                  <CreateOrder
                    usePP={usePP}
                    address={address}
                    netType={netType}
                    params={this.props.params}
                    createOrder={createOrder}
                  />
                ) : (
                  <OrderDetails
                    order={this.props.order}
                    fetchOrder={fetchOrder}
                  />
                )
              }
            </div>
          </AppStatus>
        </Card.Content>
      </Card>
    );
  }
}
