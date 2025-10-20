import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const BUTTON_VARIANTS = ["primary", "secondary", "accent-cool"] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ["default", "large", "small"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  ariaDisabled?: string | null;
  unstyled?: boolean;
  type?: ButtonType;
  label?: string;
}

@customElement("portland-button")
export class Button extends LitElement {
  // Button-specific properties only - box properties come from BoxMixin
  @property({ type: String }) variant: ButtonVariant = "primary";
  @property({ type: String }) size: ButtonSize = "default";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String, attribute: "aria-disabled" }) ariaDisabled:
    | string
    | null = null;
  @property({ type: Boolean }) unstyled = false;
  @property({ type: String }) type: ButtonType = "button";
  @property({ type: String }) className = "";
  @property({ type: String }) label = "";

  static styles = [
    css`
      @unocss-placeholder;
    `,
  ];

  get classNames() {
    const colorMap = new Map<ButtonVariant, string[]>([
      [
        "primary",
        [
          "bg-primary-medium",
          "hover:bg-primary-dark",
          "active:bg-primary-darker",
          "text-foundation-white",
        ],
      ],
      [
        "secondary",
        [
          "bg-secondary-medium",
          "hover:bg-secondary-dark",
          "active:bg-secondary-darker",
          "text-foundation-white",
        ],
      ],
      [
        "accent-cool",
        [
          "bg-accent-cool-medium",
          "hover:bg-accent-cool-dark",
          "active:bg-accent-cool-darker",
          "active:text-foundation-white",
        ],
      ],
    ]);

    const background = colorMap.get(this.variant) || [];

    console.debug(`Button background classes for ${this.variant}:`, background);

    const sizeMap = new Map<ButtonSize, string[]>([
      ["default", ["text-body"]],
      ["large", ["text-body-lg"]],
      ["small", ["text-body-sm"]],
    ]);

    const size = sizeMap.get(this.size) || [];

    console.debug(`Button size classes for ${this.size}:`, size);

    return [
      "rounded-md",
      "px-lg",
      "py-sm",
      "inline-flex",
      "items-center",
      "justify-between",
      "gap-xs",
      "font-bold",
      "disabled:bg-disabled-lighter",
      "disabled:text-disabled-dark",
      "disabled:cursor-not-allowed",
      "focus:outline-4",
      "focus:outline-offset-4",
      "focus:outline-primary-medium",
      ...background,
      ...size,
    ].join(" ");
  }

  render() {
    return html`
      <button
        type=${this.type}
        class=${this.classNames}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled || this.ariaDisabled === "true"
          ? "true"
          : "false"}
      >
        <slot name="left"></slot>
        <slot>${this.label}</slot>
        <slot name="right"></slot>
      </button>
    `;
  }
}
