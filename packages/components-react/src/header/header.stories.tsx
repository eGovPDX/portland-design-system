import { faX, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../button";
import { Header, type ReactHeaderProps } from "./header";

type StoryProps = ReactHeaderProps & {
  branding: string;
};

export default {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Title text for the header",
    },
    branding: {
      control: "text",
      description: "Branding content to display next to the city seal",
    },
  },
} satisfies Meta<StoryProps>;

type Story = StoryObj<ReactHeaderProps>;

export const Default: Story = {
  args: {
    title: "Portland.gov",
  },
};

export const Branding: Story = {
  args: {
    title: "Some Bureau App",
    branding: "Bureau",
  },
  render: (args) => {
    return (
      <Header
        title={args.title}
        branding={
          <img
            src={`https://placehold.co/100x60?text=${args.branding}`}
            alt="Brand Logo"
          />
        }
      />
    );
  },
};

export const WithChild: Story = {
  args: {
    title: "Portland.gov",
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
          <nav>Navigation goes here</nav>
          <Button
            variant="outline-inverse"
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
