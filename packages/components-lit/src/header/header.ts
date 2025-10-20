import { css, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./header.css";

// Import the component class to register it
import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";
import { UnoCSSMixin } from "../uno-mixin";

export interface HeaderProps {
  tagline?: string;
  title: string;
  url: string;
}

@customElement("portland-header")
export class Header extends UnoCSSMixin(LitElement) {
  @property({ type: String }) tagline = "";
  @property({ type: String }) title = "";
  @property({ type: String }) url = "";

  static styles = styles;

  render() {
    return html`
      <header
        role="banner"
        class="bg-base-darkest text-foundation-white py-md flex items-center"
      >
        <div class="px-xl flex justify-between items-center w-full">
          <a
            href="${this.url}"
            class="flex items-center gap-sm"
            aria-label="${this.title} homepage"
          >
            <div class="w-[56px]">
              <img src="${ASSETS_CITY_SEAL}" alt="" role="presentation" />
            </div>
            <span class="font-bold text-5xl">${this.title}</span>
          </a>
          <slot name="navigation"></slot>
        </div>
        <slot name="actions"></slot>
      </header>
    `;
  }
}
