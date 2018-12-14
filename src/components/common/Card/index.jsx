import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from './styles';

/**
 * Card
 * A card displays site content in a manner similar to a playing card.
 */
const CardComponent = ({
  fluid,
  children,
  compact,
  ...restProps
}) => (
  <Card fluid={fluid} compact={compact} {...restProps}>
    {children}
  </Card>
);

CardComponent.propTypes = {
  /** A input can take the width of its container. */
  fluid: PropTypes.bool,
  /** A card can be without padding */
  compact: PropTypes.bool,
  /** Primary content. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

CardComponent.defaultProps = {
  fluid: false,
  compact: false,
};

CardComponent.Content = ({ children, extra, compact }) => (
  <CardContent compact={compact} extra={extra}>
    {children}
  </CardContent>
);

CardComponent.Content.propsTypes = {
  /** Primary content. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  /** Shorthand for primary content of CardContent. */
  extra: PropTypes.bool,
  compact: PropTypes.bool,
};

export default CardComponent;
