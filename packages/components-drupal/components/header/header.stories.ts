import {
  BOX_COLORS,
  BOX_VARIANTS,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Button from "../button/button.component.yml";
import HeaderBranding from "./header-branding/header-branding.component.yml";
import HeaderContent from "./header-content/header-content.component.yml";
import HeaderLogo from "./header-logo/header-logo.component.yml";
import HeaderNavLink from "./header-nav-link/header-nav-link.component.yml";
import Header from "./header.component.yml";

const HEADER_ELEMENTS = [
  "div",
  "section",
  "article",
  "aside",
  "main",
  "header",
  "footer",
  "nav",
] as const;

type HeaderStoryArgs = {
  title: string;
  links: boolean;
  buttons: boolean;
  as?: (typeof HEADER_ELEMENTS)[number];
  color?: BoxColorScheme;
  variant?: BoxColorVariation;
};

const renderHeader = ({
  title,
  links,
  buttons,
  as,
  color,
  variant,
}: HeaderStoryArgs) => `
  ${Header.component({
    as,
    color,
    variant,
    header_branding: `
      ${HeaderBranding.component({
        href: "#",
        header_branding_content: `
          ${HeaderLogo.component({})}
          ${title}
        `,
      })}
    `,
    header_content: HeaderContent.component({
      header_content_content: `
      ${
        links
          ? `<ul class="header__nav-list">
              <li>${HeaderNavLink.component({ header_nav_link_content: "Home" })}</li>
              <li>${HeaderNavLink.component({ header_nav_link_content: "About" })}</li>
              <li>${HeaderNavLink.component({ header_nav_link_content: "Services" })}</li>
              <li>${HeaderNavLink.component({ header_nav_link_content: "Contact" })}</li>
            </ul>`
          : ""
      }
      ${
        buttons
          ? `${Button.component({
              color: "primary",
              variant: "moderate",
              size: "sm",
              defaultAttributes: [
                ...Button.args.defaultAttributes,
                ["class", ["rounded-md"]],
              ],
              button_content: "Navigation",
            })}
            ${Button.component({
              color: "fixed",
              variant: "light",
              size: "sm",
              outline: true,
              defaultAttributes: [
                ...Button.args.defaultAttributes,
                ["class", ["rounded-md"]],
              ],
              button_content: "Menu",
            })}`
          : ""
      }
      `,
    }),
  })}
`;

const meta: Meta<HeaderStoryArgs> = {
  title: "Components/Header",
  parameters: {
    layout: "fullscreen",
  },
  render: renderHeader,
  argTypes: {
    as: {
      control: "select",
      options: HEADER_ELEMENTS,
      description: "The HTML element to render as",
    },
    color: {
      control: "select",
      options: BOX_COLORS,
      description: "Color scheme for background and content colors",
    },
    variant: {
      control: "select",
      options: BOX_VARIANTS,
      description: "Color variation within the chosen color scheme",
    },
    title: {
      control: "text",
      description: "Title text for the header",
    },
    links: {
      control: "boolean",
      description: "Whether to include example navigation links",
    },
    buttons: {
      control: "boolean",
      description: "Whether to include example buttons",
    },
  },
  args: {
    as: "header",
    color: "fixed",
    variant: "dark",
    links: false,
    buttons: false,
    title: "Portland.gov",
  },
};

export default meta;
type Story = StoryObj<HeaderStoryArgs>;

export const Basic: Story = {
  args: {},
};
