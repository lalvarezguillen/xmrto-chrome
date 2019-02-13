import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/Card';
import Tab from '../common/Tab';
import AppStatus from '../AppStatus';
import CreateOrder from '../CreateOrder';
import TrackOrder from '../TrackOrder';
import OrderDetails from '../OrderDetails';
import { STATUS } from '../../constants';
import './styles.scss';

/**
 * Form
 * Home page form
 */
export default class Layout extends Component {
  static propTypes = {
    params: PropTypes.shape({}).isRequired,
    order: PropTypes.shape({ state: PropTypes.string }).isRequired,
    fetchOrder: PropTypes.func,
    createOrder: PropTypes.func,
    clearOrder: PropTypes.func,
    setStatus: PropTypes.func,
    changeRoute: PropTypes.func,
    route: PropTypes.number,
  };
  onTabChange = (activeTab) => {
    const { changeRoute } = this.props;
    this.props.setStatus(STATUS.ONLINE);
    changeRoute(activeTab);
  };
  render() {
    const {
      params: { status: appStatus, netType },
      order: { state },
      createOrder,
      fetchOrder,
      clearOrder,
      route,
    } = this.props;
    return (
      <Card fluid>
        <Card.Content compact>
          <AppStatus status={appStatus}>
            <div className="layout">
              <div className="layout__logo" />
              {
                route === 0 && (
                  <CreateOrder
                    netType={netType}
                    params={this.props.params}
                    createOrder={createOrder}
                    changeTab={this.onTabChange}
                  />
                )
              }
              {
                route === 1 && (
                  <div>
                    {
                      state
                        ? (
                          <OrderDetails
                            order={this.props.order}
                            clearOrder={clearOrder}
                            fetchOrder={fetchOrder}
                          />
                        )
                        : <TrackOrder fetchOrder={fetchOrder} />
                    }
                  </div>
                )
              }
            </div>
          </AppStatus>
        </Card.Content>
      </Card>
    );
  }
}
