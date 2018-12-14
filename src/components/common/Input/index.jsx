import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputWrap, InputLabel, InputButton } from './styles';

function validateNumber(e, onChange, name, min, max) {
  const value = parseFloat(e.target.value);
  if (!value) {
    onChange(e, { name, value: e.target.value });
  } else if (value <= min) {
    onChange(e, { name, value: min });
  } else if (value >= max) {
    onChange(e, { name, value: max });
  } else {
    onChange(e, { name, value });
  }
}

/**
 * Input
 * An Input is a field used to elicit a response from a user.
 */
const InputComponent = ({
  disabled,
  fluid,
  type,
  error,
  label,
  button,
  onChange,
  min,
  max,
  name,
  ...restProps
}) => (
  <InputWrap fluid={fluid}>
    <Input
      fluid={fluid}
      error={error}
      hasLabel={!!label.content || !!button.content}
      disabled={disabled}
      type={type}
      name={name}
      onChange={(e) => {
        if (type === 'number') {
          validateNumber(e, onChange, name, min, max);
        } else {
          onChange(e, { name, value: e.target.value });
        }
      }}
      {...restProps}
    />
    {
      label.content && (
        <InputLabel disabled={disabled} secondary={label.secondary}>
          {label.content}
        </InputLabel>
      )
    }
    {
      button.content && (
        <InputButton
          className={button.className}
          disabled={disabled}
          primary={button.primary}
          secondary={button.secondary}
          onClick={(button.callback && typeof button.callback === 'function') ? button.callback : () => {}}
          data-clipboard-text={button.clipboardText}
        >
          {button.content}
        </InputButton>
      )
    }
  </InputWrap>
);

InputComponent.propTypes = {
  /** A input can show it is currently unable to be interacted with. */
  disabled: PropTypes.bool,
  /** A input can take the width of its container. */
  fluid: PropTypes.bool,
  /** The HTML input type. */
  type: PropTypes.string,
  /** The minimum value of input. */
  min: PropTypes.number,
  /** The maximum value of input. */
  max: PropTypes.number,
  /** The HTML input name. */
  name: PropTypes.string.isRequired,
  /** An Input field can show the data contains errors. */
  error: PropTypes.bool,
  /** Optional Label to display along side the Input. */
  label: PropTypes.shape({ content: PropTypes.string }),
  /** Optional Button to display along side the Input. */
  button: PropTypes.shape({
    className: PropTypes.string,
    clipboardText: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  /** Called on change. */
  onChange: PropTypes.func,
};

InputComponent.defaultProps = {
  disabled: false,
  fluid: false,
  error: false,
  type: 'text',
  label: {},
  button: {},
  min: -Infinity,
  max: Infinity,
  onChange: () => {},
};

export default InputComponent;
