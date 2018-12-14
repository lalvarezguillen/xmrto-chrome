import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Form from '../common/Form';
import Button from '../common/Button';

/**
 * Track Order Form
 * Home page form
 */
export default class TrackOrder extends Component {
  static propTypes = {
    fetchOrder: PropTypes.func.isRequired,
  };
  state = {
    loading: false,
    uuid: '',
    error: '',
  };
  onSubmit = () => {
    this.setState({ loading: true });
    const { fetchOrder } = this.props;
    const { uuid } = this.state;
    fetchOrder({ uuid });
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { loading, uuid, error } = this.state;
    const valid = !!uuid;
    return (
      <div className="relative">
        <div className="block">
          <div>
            <Form>
              <div className="bottomDoubleOffset">
                <Form.Field>
                  <Input
                    name="uuid"
                    id="uuid"
                    type="text"
                    placeholder="Order Secret Key"
                    onChange={this.onChange}
                    value={uuid}
                    fluid
                  />
                </Form.Field>
              </div>
              <div>
                {
                  error && (
                    <div className="error">
                      {error}
                    </div>
                  )
                }
              </div>
            </Form>
          </div>
        </div>
        <div className="block centered">
          <Button onClick={this.onSubmit} size="big" disabled={!valid} loading={loading} primary>
            Track Order
          </Button>
        </div>
      </div>
    );
  }
}
