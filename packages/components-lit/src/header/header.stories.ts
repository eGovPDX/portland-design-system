import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, type TemplateResult } from "lit";

import "../button";
import { type HeaderProps } from "./header";
import "./header-nav";
import type { NavItem } from "./header-nav-item";

type TemplateProps = HeaderProps & {
  logo?: TemplateResult;
  navigation?: Array<NavItem>;
  actions?: TemplateResult;
};

function HeaderTemplate(props: TemplateProps) {
  return html`
    <portland-header
      title=${props.title}
      tagline=${props.tagline ?? ""}
      url=${props.url ?? "#"}
    >
      ${props.logo ? html`<span slot="logo">${props.logo}</span>` : ""}
      ${props.navigation
        ? html`<portland-header-nav
            slot="navigation"
            .navItems="${props.navigation}"
          ></portland-header-nav>`
        : ""}
      ${props.actions ? html`<div slot="actions">${props.actions}</div>` : ""}
    </portland-header>
  `;
}

const meta: Meta<TemplateProps> = {
  title: "Components/Header",
  argTypes: {
    tagline: {
      control: "text",
      description: "Subtitle or tagline for the site name.",
    },
    title: {
      control: "text",
      description: "Site name for the header",
    },
    url: {
      control: "text",
      description: "URL for the header link",
    },
    logo: { control: false },
    navigation: { control: { type: "object" } },
    actions: { control: false },
  },
  render: HeaderTemplate,
};

export default meta;

type Story = StoryObj<TemplateProps>;

export const Default: Story = {
  args: {
    title: "Portland.gov",
    logo: html`<img loading="lazy" srcset="https://portland.gov/sites/default/files/styles/max_768w/public/2020-06/citysealnew-88242.jpg?itok=K9wKREIT 219w" src="https://portland.gov/sites/default/files/styles/max_768w/public/2020-06/citysealnew-88242.jpg?itok=K9wKREIT" alt="Seal of the City of Portland, Oregon">`
  },
};

// Header with title and subtitle
export const WithTagline: Story = {
  args: {
    ...Default.args,
    tagline: "Serving the community since 1851",
  },
};

// Basic header with navigation
export const WithNavigation: Story = {
  args: {
    ...Default.args,
    navigation: [
      {
        label: "Home",
        href: "#home",
        current: true,
        children: [],
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: html`
      <portland-button>Action 1</portland-button>
      <portland-button>Action 2</portland-button>
    `,
  },
};
