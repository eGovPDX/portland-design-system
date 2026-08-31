import {
  CARD_ELEMENTS,
  CARD_LAYOUTS,
  MEDIA_POSITIONS,
} from "@cityofportland/types/card";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, type ReactCardProps } from "./card";
import { CardMedia } from "./card-media/card-media";
import { CardBody } from "./card-body/card-body";
import { CardTitle } from "./card-title/card-title";
import { CardDescription } from "./card-description/card-description";
import { CardFooter } from "./card-footer/card-footer";
import { Button } from "../button";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    as: {
      control: "select",
      options: CARD_ELEMENTS,
      description: "The semantic HTML container element of the card",
    },
    layout: {
      control: "select",
      options: CARD_LAYOUTS,
      description: "The layout of the Card, either horizontal or vertical",
    },
    border: {
      control: "boolean",
      description: "Whether the card has a border or not",
    },
    "media position": {
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
    "media position": undefined,
  },
} satisfies Meta<ReactCardProps>;

type BasicStoryProps = ReactCardProps & {
  title: string;
  description: string;
  button: string;
  imageHeight: number;
  imageWidth: number;
  "media position"?: (typeof MEDIA_POSITIONS)[number];
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
    "media position": "left",
    imageWidth: 1600,
    imageHeight: 900,
  },
  parameters: {
    controls: { exclude: ["className", "children"] },
  },
  render: ({
    "media position": mediaPosition,
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
            <Button color="primary" variant="moderate" className="rounded-md">
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
    "media position": "left",
    imageWidth: 800,
    imageHeight: 500,
    numCards: 3,
  },
  parameters: {
    controls: { exclude: ["as", "children", "className"] },
  },
  render: ({
    "media position": mediaPosition,
    title,
    description,
    button,
    imageWidth,
    imageHeight,
    numCards,
    ...args
  }) => (
    <div className="grid gap-md md:grid-cols-3">
      {Array.from({ length: numCards }, (_, index) => (
        <Card key={index} {...args}>
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
                <Button color="primary" variant="moderate">
                  {button}
                </Button>
              </CardFooter>
            )}
          </CardBody>
        </Card>
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

type IconStoryProps = ReactCardProps & {
  icon: string;
};

export const Icon: StoryObj<IconStoryProps> = {
  argTypes: {
    icon: {
      control: "text",
      description: "The SVG markup for the icon to display in the header",
    },
  },
  args: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5xl h-5xl"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>`,
  },
  parameters: {
    controls: { exclude: ["as", "children", "className"] },
  },
  render: ({ icon, "media position": mediaPosition, ...args }) => (
    <>
      <Card {...args}>
        <CardMedia inset position={mediaPosition}>
          <span dangerouslySetInnerHTML={{ __html: icon }} />
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
      <hr className="my-2xl" />
      <h2 className="heading-md">How to change the icon</h2>
      {/* REFACTOR: Use list utility class */}
      <ol className="list-decimal pl-lg">
        <li>
          <a
            className="link"
            href="https://fontawesome.com/search?ip=classic&ic=free-collection"
            target="_blank"
          >
            Browse Font Awesome icons
          </a>
        </li>
        <li>
          Click on the desired icon and copy the SVG markup (not the "Full SVG"
          markup)
        </li>
        <li>
          Paste the SVG markup into the <em>icon</em> control in Storybook
        </li>
      </ol>
    </>
  ),
};
