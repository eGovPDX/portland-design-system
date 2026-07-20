import type { ArgTypes, Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState, type KeyboardEvent, type MouseEvent } from "react";

import { Button } from "../button";
import BoxStories from "../box/box.stories";
import { Box, type ReactBoxProps } from "../box";
import {
  Header,
  HeaderBranding,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  HeaderNavLink,
  type ReactHeaderProps,
} from "./header";

type StoryProps = ReactHeaderProps & {
  title: string;
  showLinks?: boolean;
  showButtons?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  menuButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  menuButtonLabel?: string;
};

const DemoHeader = ({
  title,
  showLinks = false,
  showButtons = false,
  onClick,
  menuButtonProps,
  menuButtonLabel,
  ...props
}: StoryProps) => (
  <Header {...props}>
    <HeaderBranding as="a" href="#">
      <HeaderLogo />
      {title}
    </HeaderBranding>
    <HeaderContent>
      {showLinks && (
        <HeaderNav aria-label="Primary navigation">
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
        </HeaderNav>
      )}
      {showButtons && (
        <>
          <Button
            name="navigation"
            variant="primary"
            size="small"
            onClick={onClick}
          >
            Navigation
          </Button>
          <Button
            name="menu"
            variant="outline"
            size="small"
            onClick={onClick}
            {...menuButtonProps}
          >
            {menuButtonLabel ?? "Menu"}
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
  },
  args: {
    color: "fixed",
    variant: "dark",
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Basic: Story = {
  args: {
    title: "Portland.gov",
  },
};

export const Links: Story = {
  args: {
    ...Basic.args,
    showLinks: true,
  },
};

export const Buttons: Story = {
  args: {
    ...Basic.args,
    showButtons: true,
  },
};

export const Menu: Story = {
  args: {
    ...Basic.args,
    showButtons: true,
  },
  render: ({ ...args }: Omit<StoryProps, "onClick" | "buttons">) => {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    const handleClick = (e: MouseEvent) => {
      if (e.currentTarget instanceof HTMLButtonElement) {
        if (e.currentTarget.name === "menu") {
          setOpen((o) => !o);
        } else {
          alert(`You clicked the ${e.currentTarget.name} button!`);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    return (
      <>
        <DemoHeader
          showButtons={true}
          onClick={handleClick}
          menuButtonProps={{
            "aria-expanded": open,
            "aria-controls": panelId,
            "aria-label": open ? "Collapse menu" : "Expand menu",
            onKeyDown: handleKeyDown,
          }}
          menuButtonLabel={open ? "Collapse menu" : "Expand menu"}
          {...args}
        ></DemoHeader>
        {open && (
          <Box
            id={panelId}
            color="default"
            variant="moderate"
            className="inset-ring-lg mt-md flex align-center justify-center p-5xl text-body-lg"
          >
            You clicked the menu button!
          </Box>
        )}
      </>
    );
  },
};
