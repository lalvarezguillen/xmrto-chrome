import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VAR from '../../../variables';

const StyledCheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  -webkit-appearance: none;
	background-color: white;
	border: 1px solid ${VAR.colors.borderColor};
	border-radius: ${VAR.borderRadius}px;
	padding: 7px;
	display: inline-block;
	margin: 0 0.5rem 0 0;
	font-family: "fontello";
	vertical-align: text-bottom;
	cursor: pointer;
	
	&:active,
	&:checked:active {
	  box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.1);
	}
	
	&:focus {
    border-color: ${VAR.colors.primary};
  }
	
	&:checked {
    background: ${VAR.gradients.primary};
    border-color: ${VAR.colors.lightPrimary};
  }
  
  &:checked:before {
    content: '\\e803';
    font-size: 9px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    line-height: 150%;
    color: white;
    cursor: pointer;
  }
`;

/**
 * A checkbox allows a user to select a value from a small set of options, often binary.
 */
const Checkbox = ({ checked, name, onChange, onClick, label }) => (
  <div>
    <StyledCheckboxInput
      checked={checked}
      name={name}
      readOnly
      type="checkbox"
      onChange={e => onChange(e, { name, checked: e.target.checked })}
      onClick={onClick}
    />
    {
      label && (
        <span>{label}</span>
      )
    }
  </div>
);

Checkbox.propTypes = {
  /** Whether or not checkbox is checked. */
  checked: PropTypes.bool,
  /** The HTML input name. */
  name: PropTypes.string,
  /**
   * Called when the user attempts to change the checked state.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed checked/indeterminate state.
   */
  onChange: PropTypes.func,
  /**
   * Called when the checkbox or label is clicked.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onClick: PropTypes.func,
  /** The text of the associated label element. */
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
};

Checkbox.defaultProps = {
  checked: false,
  name: '',
  label: '',
  onChange: () => {},
  onClick: () => {},
};

export default Checkbox;
