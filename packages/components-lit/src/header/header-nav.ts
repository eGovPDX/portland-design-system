import { css, LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import "./header-nav-item";
import type { NavItem } from "./header-nav-item";

export interface HeaderNavProps {
  navItems: NavItem[];
  isMobile?: boolean;
}

@customElement("portland-header-nav")
export class HeaderNav extends LitElement {
  @property({ type: Array<NavItem> }) navItems: NavItem[] = [];
  @property({ type: Boolean, attribute: "is-mobile" }) isMobile = false;

  @state() private openSubmenu: string | null = null;

  static styles = [
    css`
      @unocss-placeholder;
    `,
  ];

  private toggleSubmenu(label: string) {
    this.openSubmenu = this.openSubmenu === label ? null : label;
  }

  private handleLinkClick() {
    if (this.isMobile) {
      this.dispatchEvent(
        new CustomEvent("close-menu", { bubbles: true, composed: true }),
      );
    }
  }

  private handleCloseMenu() {
    this.dispatchEvent(
      new CustomEvent("close-menu", { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <nav
        class="flex items-center ${this.isMobile ? "is-mobile" : ""}"
        role="navigation"
      >
        ${this.isMobile
          ? html`
              <button
                class="header-nav-close"
                @click=${this.handleCloseMenu}
                aria-label="Close menu"
              >
                <span class="header-nav-close-icon">x</span>
              </button>
            `
          : null}
        <ul class="flex list-none">
          ${this.navItems.map(
            (item, index) => html`
              <li class="header-nav-item ${item.current ? "is-current" : ""}">
                ${item.children && item.children.length > 0
                  ? html`
                      <button
                        class="header-nav-button ${this.openSubmenu ===
                        item.label
                          ? "is-open"
                          : ""}"
                        @click=${() => this.toggleSubmenu(item.label)}
                        aria-expanded=${this.openSubmenu === item.label}
                        aria-controls="submenu-${index}"
                        type="button"
                      >
                        <span>${item.label}</span>
                        <span class="header-nav-button-icon">
                          ${this.openSubmenu === item.label ? "▲" : "▼"}
                        </span>
                      </button>
                      <ul
                        id="submenu-${index}"
                        class="header-submenu ${this.openSubmenu === item.label
                          ? "is-open"
                          : ""}"
                      >
                        ${item.children.map(
                          (childItem) => html`
                            <li
                              class="header-submenu-item ${childItem.current
                                ? "is-current"
                                : ""}"
                            >
                              <a
                                href=${childItem.href}
                                class="header-submenu-link"
                                @click=${() => this.handleLinkClick()}
                                aria-current=${childItem.current
                                  ? "page"
                                  : undefined}
                              >
                                ${childItem.label}
                              </a>
                            </li>
                          `,
                        )}
                      </ul>
                    `
                  : html`
                      <a
                        href=${item.href}
                        class="header-nav-link"
                        @click=${() => this.handleLinkClick()}
                        aria-current=${item.current ? "page" : undefined}
                      >
                        ${item.label}
                      </a>
                    `}
              </li>
            `,
          )}
        </ul>
      </nav>
    `;
  }
}
