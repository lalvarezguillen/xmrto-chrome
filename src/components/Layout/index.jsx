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
  };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }
  onTabChange = (activeTab) => {
    this.props.setStatus(STATUS.ONLINE);
    this.setState({
      activeTab,
    });
  };
  render() {
    const { activeTab } = this.state;
    const {
      params: { status: appStatus},
      order: { state },
      createOrder,
      fetchOrder,
      clearOrder,
    } = this.props;
    return (
      <Card fluid>
        <Card.Content compact>
          <Tab
            onChange={this.onTabChange}
            active={activeTab}
            defaultActiveIndex={0}
            panes={[
              {
                menuItem: 'Create Order',
                render: () => (
                  <AppStatus status={appStatus}>
                    <CreateOrder
                      params={this.props.params}
                      createOrder={createOrder}
                      changeTab={this.onTabChange}
                    />
                  </AppStatus>
                ),
              },
              {
                menuItem: 'Track Order',
                render: () => (
                  <AppStatus status={appStatus}>
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
                  </AppStatus>
                ),
              },
            ]}
          />
        </Card.Content>
      </Card>
    );
  }
}
