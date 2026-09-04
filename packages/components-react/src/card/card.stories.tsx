import {
  CARD_LAYOUTS,
  MEDIA_POSITIONS,
  type MediaPosition,
} from "@cityofportland/types/card";
import type { Meta, StoryObj } from "@storybook/react-vite";

import boxStories from "../box/box.stories";
import { Button } from "../button";
import { Icon } from "../icon/icon";
import IconStories from "../icon/icon.stories";

import { Card, type ReactCardProps } from "./card";
import { CardMedia } from "./card-media";
import { CardBody } from "./card-body";
import { CardTitle } from "./card-title";
import { CardDescription } from "./card-description";
import { CardFooter } from "./card-footer";
import type { IconDefinition } from "@cityofportland/types/icon";
import { moon } from "@cityofportland/icons";

type RootStoryProps = ReactCardProps & {
  mediaPosition: MediaPosition;
};

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) => (
      <div className="@container flex flex-col justify-center p-lg">
        {story()}
      </div>
    ),
  ],
  argTypes: {
    ...boxStories.argTypes,
    layout: {
      control: "select",
      options: CARD_LAYOUTS,
      description: "The layout of the Card, either horizontal or vertical",
    },
    border: {
      control: "boolean",
      description: "Whether the card has a border or not",
    },
    mediaPosition: {
      name: "media postition",
      control: "select",
      options: MEDIA_POSITIONS,
      description: "The position of the media in horizontal cards",
      if: {
        arg: "layout",
        eq: "horizontal",
      },
    },
  },
  args: {
    as: "article",
    layout: "vertical",
    border: true,
    mediaPosition: undefined,
  },
} satisfies Meta<RootStoryProps>;

type BasicStoryProps = RootStoryProps & {
  button: string;
  description: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
};

export const Basic: StoryObj<BasicStoryProps> = {
  argTypes: {
    title: {
      control: "text",
      description: "The title of the card",
    },
    description: {
      control: "text",
      description: "The HTML description of the card",
    },
    button: {
      control: "text",
      description:
        "Text for the button in the card footer. If empty, no button is displayed.",
    },
    imageWidth: {
      control: { type: "number", min: 0, step: 100 },
      description: "The width of the image in the card",
    },
    imageHeight: {
      control: { type: "number", min: 0, step: 100 },
      description: "The height of the image in the card",
    },
  },
  args: {
    title: "Find your nearest library",
    description: "See hours, events, and services at branches near you.",
    button: "View library information",
    mediaPosition: "left",
    imageWidth: 1600,
    imageHeight: 900,
  },
  parameters: {
    controls: { exclude: ["className", "children"] },
  },
  render: ({
    mediaPosition: mediaPosition,
    title,
    description,
    button,
    imageWidth,
    imageHeight,
    ...args
  }) => (
    <Card {...args}>
      <CardMedia position={mediaPosition}>
        <img
          src={`https://picsum.photos/${imageWidth}/${imageHeight}`}
          alt="A random image from Picsum Photos"
        />
      </CardMedia>
      <CardBody>
        <CardTitle>
          <h3>
            <a href="#" className="link">
              {title}
            </a>
          </h3>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {button && (
          <CardFooter>
            <Button
              color="primary"
              variant="moderate"
              size="md"
              className="rounded-md"
            >
              {button}
            </Button>
          </CardFooter>
        )}
      </CardBody>
    </Card>
  ),
};

type MultipleCardsStoryProps = BasicStoryProps & {
  numCards: number;
};

export const MultipleCards: StoryObj<MultipleCardsStoryProps> = {
  argTypes: {
    description: {
      control: "text",
      description: "The HTML description of the card",
    },
    imageWidth: {
      control: { type: "number", min: 0, step: 100 },
      description: "The width of the image in the card",
    },
    imageHeight: {
      control: { type: "number", min: 0, step: 100 },
      description: "The height of the image in the card",
    },
    numCards: {
      name: "Number of cards",
      control: { type: "number", min: 1, step: 1 },
      description: "The number of cards to display",
    },
  },
  args: {
    title: "Find your nearest library",
    description: "See hours, events, and services at branches near you.",
    button: "View library information",
    mediaPosition: "left",
    imageWidth: 800,
    imageHeight: 500,
    numCards: 3,
  },
  parameters: {
    controls: { exclude: ["as", "children", "className"] },
  },
  render: ({
    mediaPosition,
    title,
    description,
    button,
    imageWidth,
    imageHeight,
    numCards,
    ...args
  }) => (
    <div className="grid grid-cols-1 gap-md md:grid-cols-3">
      {Array.from({ length: numCards }, (_, index) => (
        <div key={index} className="@container">
          <Card {...args}>
            <CardMedia position={mediaPosition}>
              <img
                src={`https://picsum.photos/${imageWidth}/${imageHeight}?random=${index}`}
                alt="A random image from Picsum Photos"
              />
            </CardMedia>
            <CardBody>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
              {button && (
                <CardFooter>
                  <Button
                    color="primary"
                    variant="moderate"
                    size="md"
                    className="rounded-md"
                  >
                    {button}
                  </Button>
                </CardFooter>
              )}
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  ),
};

type MultipleButtonsStoryProps = ReactCardProps & {
  buttons: string[];
};

export const MultipleButtons: StoryObj<MultipleButtonsStoryProps> = {
  argTypes: {
    buttons: {
      control: { type: "object" },
      description: "An array of button labels to display in the card footer",
    },
  },
  args: {
    buttons: ["View library information", "View events", "View services"],
  },
  parameters: {
    controls: { exclude: ["as", "children", "className"] },
  },
  render: ({ buttons, ...args }) => (
    <Card {...args}>
      <CardMedia>
        <img
          src="https://picsum.photos/1600/900"
          alt="A random image from Picsum Photos"
        />
      </CardMedia>
      <CardBody>
        <CardTitle>Find your nearest library</CardTitle>
        <CardDescription>
          See hours, events, and services at branches near you.
        </CardDescription>
        <CardFooter className="inline-flex flex-wrap gap-sm">
          {buttons.map((button, index) => (
            <Button
              key={button}
              color={index > 0 ? "secondary" : "primary"}
              variant="moderate"
              size="md"
              className="rounded-md"
            >
              {button}
            </Button>
          ))}
        </CardFooter>
      </CardBody>
    </Card>
  ),
};

type IconStoryProps = RootStoryProps & {
  icon: IconDefinition;
};

export const IconStory: StoryObj<IconStoryProps> = {
  name: "Icon",
  argTypes: {
    icon: IconStories.argTypes!.icon,
  },
  args: {
    icon: moon,
  },
  parameters: {
    controls: { exclude: ["as", "children", "className"] },
  },
  render: ({ icon, mediaPosition, ...args }) => (
    <>
      <Card {...args}>
        <CardMedia position={mediaPosition}>
          <Icon icon={icon} size="lg" />
        </CardMedia>
        <CardBody>
          <CardTitle>Why go to the moon?</CardTitle>
          <CardDescription>
            We choose to go to the moon and do other things, not because they
            are easy, but because they are hard.
          </CardDescription>
          <CardFooter>
            <a className="link" href="#">
              Learn more
            </a>
          </CardFooter>
        </CardBody>
      </Card>
    </>
  ),
};
