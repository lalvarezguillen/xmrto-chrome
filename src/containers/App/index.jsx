import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Layout from '../../components/Layout';

class App extends Component {
  static propTypes = {
    paramsStore: PropTypes.shape({
      fetchParams: PropTypes.func,
      setStatus: PropTypes.func,
      params: PropTypes.shape({}),
    }).isRequired,
    orderStore: PropTypes.shape({
      order: PropTypes.shape({}),
      fetchOrder: PropTypes.func,
      createOrder: PropTypes.func,
      clearOrder: PropTypes.func,
    }).isRequired,
    routeStore: PropTypes.shape({
      changeRoute: PropTypes.func,
      route: PropTypes.number,
    }).isRequired,
  };
  componentDidMount() {
    const { paramsStore: { fetchParams } } = this.props;
    fetchParams();
  };
  render() {
    const {
      paramsStore: {
        setStatus,
        params,
      },
      orderStore: {
        order,
        fetchOrder,
        createOrder,
        clearOrder,
      },
      routeStore: { changeRoute, route },
    } = this.props;
    return (
      <div style={{ width: '350px' }}>
        <Layout
          params={params}
          order={order}
          fetchOrder={fetchOrder}
          createOrder={createOrder}
          clearOrder={clearOrder}
          setStatus={setStatus}
          changeRoute={changeRoute}
          route={route}
        />
      </div>
    );
  }
}

export default inject("paramsStore", "orderStore", "routeStore", "orderFormStore")(observer(App));