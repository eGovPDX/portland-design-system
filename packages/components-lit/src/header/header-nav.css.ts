import { css } from "lit";

const styles = css`
  .header-nav {
    display: flex;
    align-items: center;
    font-family: var(--pgov-header-font-family, "Open Sans");
  }
  .header-nav.is-mobile {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  .header-nav-list {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .header-nav.is-mobile .header-nav-list {
    flex-direction: column;
    gap: 0;
  }
  .header-nav-item {
    position: relative;
    display: flex;
    align-items: center;
  }
  .header-nav-item.is-current > .header-nav-link,
  .header-nav-item.is-current > .header-nav-button {
    font-weight: 700;
    color: var(--pgov-header-title-color, #0050d8);
  }
  .header-nav-link,
  .header-nav-button {
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
  }
  .header-nav-link:hover,
  .header-nav-link:focus,
  .header-nav-button:hover,
  .header-nav-button:focus {
    outline: 2px solid var(--color-blue-50);
    outline-offset: 2px;
  }
  .header-nav-button {
    position: relative;
  }
  .header-nav-button-icon {
    margin-left: 0.5rem;
    font-size: 0.75em;
    pointer-events: none;
  }
  .header-submenu {
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
  .header-nav.is-mobile .header-submenu {
    position: static;
    box-shadow: none;
    background: none;
    min-width: 0;
    padding: 0;
  }
  .header-submenu.is-open {
    display: block;
  }
  .header-submenu-item {
    width: 100%;
  }
  .header-submenu-item.is-current > .header-submenu-link {
    font-weight: 700;
    color: var(--pgov-header-title-color, #0050d8);
  }
  .header-submenu-link {
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
  .header-submenu-link:hover,
  .header-submenu-link:focus {
    background: var(--pgov-header-menu-link-hover-bg, #e1e5ea);
    color: var(--pgov-header-link-hover-color, #0050d8);
    outline: none;
  }
  .header-nav-close {
    background: none;
    border: none;
    color: var(--pgov-header-link-color, #1b1b1b);
    font-size: 2rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    z-index: 20;
    padding: 0.25rem 0.5rem;
    line-height: 1;
  }
  .header-nav-close-icon {
    font-size: 2rem;
    line-height: 1;
    pointer-events: none;
  }
  @media (max-width: 768px) {
    .header-nav {
      width: 100%;
    }
    .header-nav-list {
      flex-direction: column;
      gap: 0;
    }
    .header-nav-item {
      width: 100%;
    }
    .header-nav-link,
    .header-nav-button {
      width: 100%;
      justify-content: flex-start;
      padding-left: 1.5rem;
    }
    .header-submenu-link {
      padding-left: 2.5rem;
    }
  }
`;

export default styles;
