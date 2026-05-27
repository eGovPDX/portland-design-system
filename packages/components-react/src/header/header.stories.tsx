import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";
import type { ArgTypes, Meta, StoryObj } from "@storybook/react-vite";
import { useState, type MouseEvent } from "react";

import { Button } from "../button";
import BoxStories from "../box/box.stories";
import { Box, type ReactBoxProps } from "../box";
import {
  Header,
  HeaderBranding,
  HeaderContent,
  HeaderLogo,
  HeaderNavLink,
  type ReactHeaderProps,
} from "./header";

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
      <HeaderLogo>
        <img src={ASSETS_CITY_SEAL} alt="City of Portland Seal" />
      </HeaderLogo>
      {title}
    </HeaderBranding>
    <HeaderContent>
      {links && (
        <ul className="header__nav-list">
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
        </ul>
      )}
      {buttons && (
        <>
          <Button
            name="navigation"
            variant="primary"
            size="small"
            onClick={onClick}
          >
            Navigation
          </Button>
          <Button name="menu" variant="outline" size="small" onClick={onClick}>
            Menu
          </Button>
        </>
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
    ...Object.entries(BoxStories.argTypes!)
      .filter(([key]) => key !== "as")
      .reduce(
        (acc, [key, value]) => {
          acc[key] = {
            ...value,
          };
          return acc;
        },
        {} satisfies Partial<ArgTypes<ReactBoxProps>>
      ),
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

export const Menu: Story = {
  parameters: {
    controls: { exclude: ["buttons", "onClick"] },
  },
  args: {
    ...Basic.args,
    buttons: true,
  },
  render: ({ ...args }: Omit<StoryProps, "onClick" | "buttons">) => {
    const [open, setOpen] = useState(false);

    const handleClick = (e: MouseEvent) => {
      if (e.currentTarget instanceof HTMLButtonElement) {
        if (e.currentTarget.name === "menu") {
          setOpen((o) => !o);
        } else {
          alert(`You clicked the ${e.currentTarget.name} button!`);
        }
      }
    };

    return (
      <>
        <DemoHeader buttons={true} onClick={handleClick} {...args}></DemoHeader>
        {open && (
          <Box
            color="default"
            variant="moderate"
            className="inset-ring-lg flex align-center justify-center p-5xl text-body-lg"
          >
            You clicked the menu button!
          </Box>
        )}
      </>
    );
  },
};
