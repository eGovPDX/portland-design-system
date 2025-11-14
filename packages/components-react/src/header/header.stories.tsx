import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";
import { faX, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../button";
import {
  Header,
  HeaderBranding,
  HeaderContent,
  HeaderLogo,
  type ReactHeaderProps,
} from "./header";

type StoryProps = ReactHeaderProps & {
  title: string;
  branding: [string];
};

export default {
  title: "Components/Header",
  component: Header,
  render: ({ title, branding, children }) => (
    <Header>
      <HeaderBranding>
        <HeaderLogo>
          <img src={ASSETS_CITY_SEAL} alt="City of Portland Seal" />
        </HeaderLogo>
        {branding &&
          branding.map((b) => (
            <HeaderLogo>
              <img
                src={`https://placehold.co/100x60?text=${b}`}
                alt="Brand Logo"
              />
            </HeaderLogo>
          ))}
        {title}
      </HeaderBranding>
      <HeaderContent>{children}</HeaderContent>
    </Header>
  ),
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Title text for the header",
    },
    branding: {
      control: "check",
      description: "Bureaus to display in the header branding",
      options: ["BES", "PBOT", "BPS", "PWB", "Parks"],
    },
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    title: "Portland.gov",
  },
};

export const Branding: Story = {
  args: {
    title: "Some Bureau App",
    branding: ["BES"],
  },
};

export const WithChild: Story = {
  args: {
    ...Default.args,
    children: <nav>Navigation goes here</nav>,
  },
};

export const Menu: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Header {...args}>
          <HeaderBranding>
            <HeaderLogo>
              <img src={ASSETS_CITY_SEAL} alt="City of Portland Seal" />
            </HeaderLogo>
            {args.title}
          </HeaderBranding>
          <HeaderContent>
            <nav>Navigation goes here</nav>
            <Button
              variant="outline-inverse"
              size="small"
              onClick={(_) => setOpen(!open)}
              left={
                open ? (
                  <FontAwesomeIcon icon={faX} />
                ) : (
                  <FontAwesomeIcon icon={faHamburger} />
                )
              }
            >
              Menu
            </Button>
          </HeaderContent>
        </Header>
        {open && (
          <div className="flex align-center justify-center p-8 m-1 border-2 border-current text-3xl">
            Hello!
          </div>
        )}
      </>
    );
  },
};
