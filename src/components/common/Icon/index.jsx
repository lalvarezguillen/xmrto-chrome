import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VAR from '../../../variables';
import './customIcons.scss';

const StyledIcon = styled.i`
  color: ${({ color }) => color};
`;

const Icon = ({ name, color, className, title }) => (
  <StyledIcon color={color} title={title} className={`icon-${name} ${className}`} />
);

Icon.propTypes = {
  name: PropTypes.oneOf([
    'cross',
    'clock',
    'file',
    'check',
    'trash',
    'balloon',
    'check-bold',
    'check-double',
    'image',
    'pdf',
    'settings',
    'logout',
    'person',
    'wallet',
    'attach',
    'info',
    'arrow-up',
    'arrow-down',
    'warning',
    'refresh',
    'clock-pending',
    'search',
    'arrow-left',
    'copy',
    'email',
    'flash',
    'dots',
    'bell',
    'plus',
    'angle-left',
    'angle-right',
    'menu',
    'attention',
    'ok-circled',
  ]).isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

Icon.defaultProps = {
  color: VAR.colors.textColor,
  className: '',
  title: '',
};

export default Icon;
