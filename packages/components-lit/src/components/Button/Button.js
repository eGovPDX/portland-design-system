import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * Portland Button Component
 * A button draws attention to important actions with a large selectable surface.
 */
export class PortlandButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .usa-button {
      font-family: 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 1.06rem;
      line-height: 0.9;
      background-color: #005ea2;
      border: 0;
      border-radius: 0.25rem;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-weight: 700;
      margin-right: 0.5rem;
      padding: 0.75rem 1.25rem;
      text-align: center;
      text-decoration: none;
      width: auto;
      -webkit-font-smoothing: subpixel-antialiased;
    }

    .usa-button:visited {
      color: white;
    }

    .usa-button:hover,
    .usa-button.usa-button--hover {
      background-color: #1a4480;
      border-bottom: 0;
      color: white;
      text-decoration: none;
    }

    .usa-button:active,
    .usa-button.usa-button--active {
      background-color: #162e51;
      color: white;
    }

    .usa-button:focus,
    .usa-button.usa-button--focus {
      outline: 0.25rem solid #fd0;
      outline-offset: 0;
    }

    .usa-button:disabled,
    .usa-button.usa-button--disabled {
      background-color: #c9c9c9;
      color: #454545;
      cursor: not-allowed;
      opacity: 1;
    }

    .usa-button:disabled:hover,
    .usa-button.usa-button--disabled:hover,
    .usa-button:disabled:active,
    .usa-button.usa-button--disabled:active,
    .usa-button:disabled:focus,
    .usa-button.usa-button--disabled:focus {
      background-color: #c9c9c9;
      border: 0;
      color: #454545;
      outline: 0;
      pointer-events: none;
      text-decoration: none;
    }

    /* Button Variants */
    .usa-button--secondary {
      background-color: #d83933;
      color: white;
    }

    .usa-button--secondary:hover,
    .usa-button--secondary.usa-button--hover {
      background-color: #b50909;
    }

    .usa-button--secondary:active,
    .usa-button--secondary.usa-button--active {
      background-color: #8b0a03;
    }

    .usa-button--accent-cool {
      background-color: #00bde3;
      color: white;
    }

    .usa-button--accent-cool:hover,
    .usa-button--accent-cool.usa-button--hover {
      background-color: #28a0cb;
    }

    .usa-button--accent-cool:active,
    .usa-button--accent-cool.usa-button--active {
      background-color: #07648d;
    }

    .usa-button--accent-warm {
      background-color: #fa9441;
      color: white;
    }

    .usa-button--accent-warm:hover,
    .usa-button--accent-warm.usa-button--hover {
      background-color: #c05600;
    }

    .usa-button--accent-warm:active,
    .usa-button--accent-warm.usa-button--active {
      background-color: #775540;
    }

    .usa-button--base {
      background-color: #565c65;
      color: white;
    }

    .usa-button--base:hover,
    .usa-button--base.usa-button--hover {
      background-color: #3d4551;
    }

    .usa-button--base:active,
    .usa-button--base.usa-button--active {
      background-color: #2d2e2f;
    }

    .usa-button--outline {
      background-color: transparent;
      border: 2px solid #005ea2;
      color: #005ea2;
    }

    .usa-button--outline:hover,
    .usa-button--outline.usa-button--hover {
      background-color: #005ea2;
      border-color: #005ea2;
      color: white;
    }

    .usa-button--outline:active,
    .usa-button--outline.usa-button--active {
      background-color: #1a4480;
      border-color: #1a4480;
      color: white;
    }

    .usa-button--outline-inverse {
      background-color: transparent;
      border: 2px solid white;
      color: white;
    }

    .usa-button--outline-inverse:hover,
    .usa-button--outline-inverse.usa-button--hover {
      background-color: white;
      border-color: white;
      color: #1b1b1b;
    }

    .usa-button--outline-inverse:active,
    .usa-button--outline-inverse.usa-button--active {
      background-color: #c9c9c9;
      border-color: #c9c9c9;
      color: #1b1b1b;
    }

    /* Size Variants */
    .usa-button--big {
      font-size: 1.31rem;
      padding: 1rem 2rem;
    }

    /* Unstyled */
    .usa-button--unstyled {
      background-color: transparent;
      border: 0;
      border-radius: 0;
      color: #005ea2;
      font-weight: normal;
      margin: 0;
      padding: 0;
      text-align: left;
    }

    .usa-button--unstyled:hover,
    .usa-button--unstyled.usa-button--hover {
      background-color: transparent;
      color: #1a4480;
      text-decoration: underline;
    }

    /* Icon styles */
    .usa-button__icon {
      height: 1em;
      width: 1em;
      fill: currentColor;
      vertical-align: text-bottom;
    }

    .usa-button__icon--left {
      margin-right: 0.5rem;
    }

    .usa-button__icon--right {
      margin-left: 0.5rem;
    }

    /* FontAwesome icon support */
    .fa-icon {
      height: 1em;
      width: 1em;
      vertical-align: text-bottom;
    }

    .fa-icon--left {
      margin-right: 0.5rem;
    }

    .fa-icon--right {
      margin-left: 0.5rem;
    }
  `;

  @property({ type: String })
  variant = 'default';

  @property({ type: String })
  size = 'default';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, attribute: 'aria-disabled' })
  ariaDisabled = false;

  @property({ type: Boolean })
  unstyled = false;

  @property({ type: String })
  type = 'button';

  @property({ type: String, attribute: 'start-icon' })
  startIcon = '';

  @property({ type: String, attribute: 'end-icon' })
  endIcon = '';

  @property({ type: String, attribute: 'class' })
  className = '';

  _handleClick(event) {
    if (this.disabled || this.ariaDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Dispatch custom click event
    this.dispatchEvent(new CustomEvent('portland-button-click', {
      detail: { originalEvent: event },
      bubbles: true,
      composed: true
    }));
  }

  _renderIcon(icon, position) {
    if (!icon) return '';

    // Support for FontAwesome icon names (e.g., 'fas fa-arrow-right')
    if (icon.includes('fa-')) {
      return html`
        <span class="fa-icon fa-icon--${position}">
          <i class="${icon}"></i>
        </span>
      `;
    }

    // Support for SVG icons or other icon systems
    return html`
      <span class="usa-button__icon usa-button__icon--${position}">
        ${icon}
      </span>
    `;
  }

  render() {
    const baseClass = 'usa-button';
    const variantClass = this.variant !== 'default' ? `${baseClass}--${this.variant}` : '';
    const sizeClass = this.size === 'big' ? `${baseClass}--big` : '';
    const unstyledClass = this.unstyled ? `${baseClass}--unstyled` : '';

    const classes = {
      [baseClass]: true,
      [variantClass]: !!variantClass,
      [sizeClass]: !!sizeClass,
      [unstyledClass]: !!unstyledClass,
      [this.className]: !!this.className
    };

    return html`
      <button
        type="${this.type}"
        class="${classMap(classes)}"
        ?disabled="${this.disabled}"
        aria-disabled="${ifDefined(this.ariaDisabled || this.disabled ? 'true' : undefined)}"
        @click="${this._handleClick}"
      >
        ${this._renderIcon(this.startIcon, 'left')}
        <slot></slot>
        ${this._renderIcon(this.endIcon, 'right')}
      </button>
    `;
  }
}

// Define the custom element
customElements.define('portland-button', PortlandButton);
