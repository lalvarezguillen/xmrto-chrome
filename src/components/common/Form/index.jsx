import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormField } from './styles';

/**
 * Form
 * A Form displays a set of related user input fields in a structured way.
 */
const FormComponent = ({ children, ...props }) => (
  <Form {...props}>
    {children}
  </Form>
);

FormComponent.propTypes = {
  /** Primary content. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

FormComponent.defaultProps = {};

FormComponent.Field = ({ children, inline }) => (
  <FormField inline={inline}>
    {children}
  </FormField>
);

FormComponent.Field.propsTypes = {
  /** Primary content. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default FormComponent;
