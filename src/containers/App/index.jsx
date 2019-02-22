import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Layout from '../../components/Layout';

class App extends Component {
  static propTypes = {
    paramsStore: PropTypes.shape({
      fetchParams: PropTypes.func,
      params: PropTypes.shape({}),
    }).isRequired,
    orderStore: PropTypes.shape({
      order: PropTypes.shape({}),
      fetchOrder: PropTypes.func,
      createOrder: PropTypes.func,
    }).isRequired,
    usePP: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    netType: PropTypes.string.isRequired,
  };
  render() {
    const {
      usePP,
      address,
      netType,
      paramsStore: {
        params,
      },
      orderStore: {
        order,
        fetchOrder,
        createOrder,
      },
    } = this.props;
    return (
      <div style={{ width: '350px' }}>
        <Layout
          usePP={usePP}
          address={address}
          netType={netType}
          params={params}
          order={order}
          createOrder={createOrder}
          fetchOrder={fetchOrder}
        />
      </div>
    );
  }
}

export default inject("paramsStore", "orderStore")(observer(App));