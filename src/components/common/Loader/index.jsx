import React from 'react';
import PropTypes from 'prop-types';
import { StyledLoader, StyledLoaderBounce } from './style';

// eslint-disable-next-line
const Loader = ({ active, cover, dimmer }) => active ? (
  <StyledLoader cover={cover} dimmer={dimmer}>
    <StyledLoaderBounce index={0} />
    <StyledLoaderBounce index={1} />
    <StyledLoaderBounce index={2} />
    <StyledLoaderBounce index={3} />
    <StyledLoaderBounce index={4} />
  </StyledLoader>
) : null;

Loader.propTypes = {
  active: PropTypes.bool,
  cover: PropTypes.bool,
  dimmer: PropTypes.bool,
};

Loader.defaultProps = {
  active: false,
  dimmer: false,
  cover: false,
};

export default Loader;
