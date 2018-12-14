import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  TabHeader,
  TabMenuItem,
  TabPane,
} from './styles';

/**
 * Tab
 * A Tab is a hidden section of content activated by a Menu.
 */
export default class TabComponent extends Component {
  static propTypes = {
    /** Array of objects describing each Menu.Item and Tab.Pane:
     { menuItem: 'Home', render: () => <Tab.Pane /> }
     or
     { menuItem: 'Home', pane: 'Welcome' } */
    panes: PropTypes.arrayOf(PropTypes.shape({})),
    /** The initial activeIndex. */
    defaultActiveIndex: PropTypes.number,
    // eslint-disable-next-line
    active: PropTypes.number,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    panes: [],
    defaultActiveIndex: 0,
    onChange: () => {},
  };
  constructor(props) {
    super(props);
    const { defaultActiveIndex } = this.props;
    this.state = {
      active: defaultActiveIndex,
    };
  }
  handleClick = (index) => {
    const { onChange } = this.props;
    this.setState({ active: index });
    onChange(index);
  };
  render() {
    const { panes, active: pActive } = this.props;
    const { active: sActive } = this.state;
    const active = Number.isInteger(pActive) ? pActive : sActive;
    return (
      <Tab>
        <TabHeader>
          {
            panes.map((i, index) => (
              <TabMenuItem
                // eslint-disable-next-line
                key={`tab-menu-item-${index}`}
                onClick={() => this.handleClick(index)}
                data-id={index}
                active={index === active}
              >
                {i.menuItem}
              </TabMenuItem>
            ))
          }
        </TabHeader>
        {
          // eslint-disable-next-line
          panes.map((i, index) => index === active ? (
            // eslint-disable-next-line
            <TabPane key={`tab-pane-${index}`}>
              {i.render ? i.render() : null}
            </TabPane>
          ) : null)
        }
      </Tab>
    );
  }
}
