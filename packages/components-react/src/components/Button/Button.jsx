import PropTypes from 'prop-types';
import React from 'react';

import '@cityofportland/components-lit/button';

/**
 * Button component using the portland-button web component.
 *
 * @component
 * @param {Object} props - Component props
 * @returns {JSX.Element} portland-button element
 */
export const Button = (
    {
      children = null,
      variant = 'default',
      size = 'default',
      disabled = false,
      ariaDisabled = false,
      unstyled = false,
      type = 'button',
      startIcon = null,
      endIcon = null,
      className = '',
      label,
      ...props
    }
  ) => {
    return (
      <portland-button
        variant={variant}
        size={size}
        type={type}
        class={className}
        aria-disabled={ariaDisabled || disabled ? 'true' : 'false'}
        disabled={disabled}
        unstyled={unstyled}
        label={label}
        starticon={startIcon}
        endicon={endIcon}
        {...props}
      >
        {startIcon && (
          <span slot="startIcon">{startIcon}</span>
        )}
        {children || label}
        {endIcon && (
          <span slot="endIcon">{endIcon}</span>
        )}
      </portland-button>
    );
  };


Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'secondary',
    'accent-cool',
    'accent-warm',
    'base',
    'outline',
    'outline-inverse'
  ]),
  size: PropTypes.oneOf(['default', 'big']),
  disabled: PropTypes.bool,
  ariaDisabled: PropTypes.bool,
  unstyled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  startIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  endIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  className: PropTypes.string
}; 