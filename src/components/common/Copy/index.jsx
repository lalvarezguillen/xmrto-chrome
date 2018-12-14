import React, { Component } from 'react';
import Clipboard from 'clipboard';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import randHash from '../../../helpers/randHash';
import VAR from '../../../variables';

const StyledCopy = styled.div`
  position: relative;
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  max-width: 100%;
  
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, transparent 50%, ${VAR.colors.focusedBorderColor} 50%);
    background-size: 10px 100%;
  }
`;

StyledCopy.Text = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default class Copy extends Component {
  static propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
  constructor(props) {
    super(props);
    this.hash = randHash();
    // eslint-disable-next-line
    const copy = new Clipboard(`.copyToClipboard_${this.hash}`);
  }
  render() {
    const { text } = this.props;
    return (
      <StyledCopy>
        <StyledCopy.Text>
          {text}
        </StyledCopy.Text>
        <Tooltip
          content={(
            <div className="fz12 successText normal nowrap">
              <span className="fz9">
                <Icon name="check" color={VAR.colors.success} />
              </span>&nbsp;&nbsp;<span>Copied</span>
            </div>
          )}
          autoDismiss={2000}
          on="click"
        >
          <button type="button" className={`copyToClipboard_${this.hash} clearButton flexVertAlign`} data-clipboard-text={text}>
            <Icon name="copy" color={VAR.colors.placeholderColor} className="fz14" />
          </button>
        </Tooltip>
      </StyledCopy>
    );
  }
}
