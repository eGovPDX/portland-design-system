import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export interface NavItem {
  label: string;
  href?: string;
  current?: boolean;
  children?: NavItem[];
}

@customElement("header-nav-item")
export class HeaderNavItem extends LitElement {
  @property({ type: Object }) item!: NavItem;
  @property({ type: Boolean, attribute: "is-mobile" }) isMobile = false;
  @property({ type: Number }) index = 0;

  @state() private isSubmenuOpen = false;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      position: relative;
    }

    :host([is-mobile]) {
      width: 100%;
    }

    .nav-item.is-current > .nav-link,
    .nav-item.is-current > .nav-button {
      font-weight: 700;
      color: var(--pgov-header-title-color, #0050d8);
    }

    .nav-link,
    .nav-button {
      background: none;
      border: none;
      color: var(--pgov-header-link-color, #fff);
      font-size: 1rem;
      font-family: inherit;
      cursor: pointer;
      padding: 0.75rem 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: color 0.2s;
      width: 100%;
      justify-content: flex-start;
    }

    :host([is-mobile]) .nav-link,
    :host([is-mobile]) .nav-button {
      padding-left: 1.5rem;
    }

    .nav-link:hover,
    .nav-link:focus,
    .nav-button:hover,
    .nav-button:focus {
      color: var(--pgov-header-link-hover-color, #a8c6ff);
      outline: none;
    }

    .nav-button-icon {
      margin-left: 0.5rem;
      font-size: 0.75em;
      pointer-events: none;
    }

    .submenu {
      display: none;
      position: absolute;
      left: 0;
      top: 100%;
      min-width: 180px;
      background: var(--pgov-header-dropdown-bg, #fff);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      margin: 0;
      padding: 0.5rem 0;
      list-style: none;
      z-index: 10;
    }

    :host([is-mobile]) .submenu {
      position: static;
      box-shadow: none;
      background: none;
      min-width: 0;
      padding: 0;
    }

    .submenu.is-open {
      display: block;
    }

    .submenu-item {
      width: 100%;
    }

    .submenu-item.is-current > .submenu-link {
      font-weight: 700;
      color: var(--pgov-header-title-color, #0050d8);
    }

    .submenu-link {
      display: block;
      width: 100%;
      padding: 0.5rem 1.5rem;
      color: var(--pgov-header-link-color, #1b1b1b);
      text-decoration: none;
      background: none;
      font-size: 1rem;
      transition:
        background 0.2s,
        color 0.2s;
    }

    :host([is-mobile]) .submenu-link {
      padding-left: 2.5rem;
    }

    .submenu-link:hover,
    .submenu-link:focus {
      background: var(--pgov-header-menu-link-hover-bg, #e1e5ea);
      color: var(--pgov-header-link-hover-color, #0050d8);
      outline: none;
    }
  `;

  private toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  private handleLinkClick() {
    this.dispatchEvent(
      new CustomEvent("nav-item-click", {
        detail: { item: this.item },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const hasChildren = this.item.children && this.item.children.length > 0;

    return html`
      <div class="nav-item ${this.item.current ? "is-current" : ""}">
        ${hasChildren
          ? html`
              <button
                class="nav-button ${this.isSubmenuOpen ? "is-open" : ""}"
                @click=${this.toggleSubmenu}
                aria-expanded=${this.isSubmenuOpen}
                aria-controls="submenu-${this.index}"
                type="button"
              >
                <span>${this.item.label}</span>
                <span class="nav-button-icon">
                  ${this.isSubmenuOpen ? "▲" : "▼"}
                </span>
              </button>
              <ul
                id="submenu-${this.index}"
                class="submenu ${this.isSubmenuOpen ? "is-open" : ""}"
                role="menu"
              >
                ${this.item.children!.map(
                  (item, index) => html`
                    <li role="none">
                      <header-nav-item 
                        .item=${item}
                        .index=${index}
                        ?is-mobile=${this.isMobile}>
                      />
                    </li>
                  `,
                )}
              </ul>
            `
          : html`
              <a
                href=${this.item.href || "#"}
                class="nav-link"
                @click=${this.handleLinkClick}
                aria-current=${this.item.current ? "page" : undefined}
              >
                ${this.item.label}
              </a>
            `}
      </div>
    `;
  }
}
