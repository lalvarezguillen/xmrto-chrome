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
    }).isRequired,
  };
  state = {};
  constructor(){
    super();
  }
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
    } = this.props;
    return (
      <div>
        <Layout
          params={params}
          order={order}
          fetchOrder={fetchOrder}
          createOrder={createOrder}
          clearOrder={clearOrder}
          setStatus={setStatus}
        />
      </div>
    );
  }
}

export default inject("paramsStore", "orderStore")(observer(App));