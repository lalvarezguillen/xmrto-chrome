import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles';

const sizes = ['small', 'medium', 'big'];

/**
 * Button
 * A Button indicates a possible user action.
 */
const ButtonComponent = ({
  children,
  primary,
  secondary,
  size,
  disabled,
  fluid,
  loading,
  ...restProps
}) => (
  <Button
    primary={primary}
    secondary={secondary}
    size={size}
    fluid={fluid}
    disabled={disabled}
    loading={loading}
    {...restProps}
  >
    {children}
  </Button>
);

ButtonComponent.propTypes = {
  /** Primary content. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,

  /** A button can be formatted to show different levels of emphasis. */
  primary: PropTypes.bool,

  /** A button can be formatted to show different levels of emphasis. */
  secondary: PropTypes.bool,

  /** A button can show it is currently unable to be interacted with. */
  disabled: PropTypes.bool,

  /** A button can have different sizes. */
  size: PropTypes.oneOf(sizes),

  /** A button can take the width of its container. */
  fluid: PropTypes.bool,

  /** A button can show a loading indicator. */
  loading: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  primary: false,
  secondary: false,
  disabled: false,
  fluid: false,
  loading: false,
  size: 'medium',
};

export default ButtonComponent;
