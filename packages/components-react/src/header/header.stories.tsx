import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button";
import BoxStories from "../box/box.stories";
import { Header, type ReactHeaderProps } from "./header";
import { HeaderBranding } from "./header-branding";
import { HeaderContent } from "./header-content";
import { HeaderLogo } from "./header-logo";
import { HeaderNavLink } from "./header-nav-link";
import { HeaderNavList } from "./header-nav-list";

type StoryProps = ReactHeaderProps & {
  title: string;
  links: boolean;
  buttons: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const DemoHeader = ({
  title,
  links,
  buttons,
  children,
  onClick,
  ...props
}: StoryProps) => (
  <Header {...props}>
    <HeaderBranding as="a" href="#">
      <HeaderLogo />
      {title}
    </HeaderBranding>
    <HeaderContent>
      {links && (
        <HeaderNavList>
          <li>
            <HeaderNavLink href="#">Home</HeaderNavLink>
          </li>
          <li>
            <HeaderNavLink href="#">About</HeaderNavLink>
          </li>
          <li>
            <HeaderNavLink href="#">Services</HeaderNavLink>
          </li>
          <li>
            <HeaderNavLink href="#">Contact</HeaderNavLink>
          </li>
        </HeaderNavList>
      )}
      {buttons && (
        <div className="flex gap-sm">
          <Button
            name="navigation"
            color="primary"
            variant="moderate"
            size="sm"
            className="rounded-md"
            onClick={onClick}
          >
            Navigation
          </Button>
          <Button
            name="menu"
            color="fixed"
            variant="light"
            outline
            size="sm"
            className="rounded-md"
            onClick={onClick}
          >
            Menu
          </Button>
        </div>
      )}
    </HeaderContent>
  </Header>
);

export default {
  title: "Components/Header",
  component: Header,
  render: DemoHeader,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    ...BoxStories.argTypes,
    title: {
      control: "text",
      description: "Title text for the header",
    },
    links: {
      control: "boolean",
      description:
        "Whether to include example navigation links in the header content",
    },
    buttons: {
      control: "boolean",
      description: "Whether to include example buttons in the header content",
    },
  },
  args: {
    color: "fixed",
    variant: "dark",
    links: false,
    buttons: false,
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Basic: Story = {
  args: {
    title: "Portland.gov",
  },
};
