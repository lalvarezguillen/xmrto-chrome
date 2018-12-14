import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import VAR from '../../../variables';

const StyledTooltipWrap = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltip = styled.div`
  display: none;
  position: absolute;
  bottom: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 0.5rem 1rem;
  border: 1px solid ${VAR.colors.borderColor};
  border-radius: ${VAR.borderRadius}px;
  line-height: 1.5;
  
  &::before {
    content: ''; 
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-top: 10px solid ${VAR.colors.borderColor};
   }
   
   &::after {
    content: ''; 
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-top: 10px solid white;
   }
  
  ${({ open }) => open && css`
    display: block;
  `};
  
  ${({ on, controlled }) => (on === 'hover' && !controlled) && css`
    ${StyledTooltipWrap}:hover & {
      display: block;
    }
  `};
`;

class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    controlled: PropTypes.bool,
    open: PropTypes.bool,
    autoDismiss: PropTypes.number,
    on: PropTypes.oneOf(['hover', 'click']),
  };
  static defaultProps = {
    controlled: false,
    open: false,
    on: 'hover',
    autoDismiss: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClickOutside = () => {
    this.setState({ open: false });
  };
  handleClick = () => {
    const { controlled, autoDismiss } = this.props;
    const { open } = this.state;
    if (!controlled) {
      this.setState({ open: !open }, () => {
        if (autoDismiss && !open) {
          setTimeout(() => this.setState({ open: false }), autoDismiss);
        }
      });
    }
  };
  render() {
    const { children, content, open, on, controlled } = this.props;
    const { open: ownOpen } = this.state;
    return (
      <StyledTooltipWrap onClick={this.handleClick}>
        {children}
        <StyledTooltip open={open || ownOpen} on={on} controled={controlled}>
          {content}
        </StyledTooltip>
      </StyledTooltipWrap>
    );
  }
}

export default onClickOutside(Tooltip);
