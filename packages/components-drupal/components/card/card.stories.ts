import {
  CARD_ELEMENTS,
  CARD_LAYOUTS,
  MEDIA_POSITIONS,
  type CardProps,
  type MediaPosition,
} from "@cityofportland/types/card";
import type { Meta, StoryObj } from "@storybook/html-vite";

import "../box/box.component.yml";
import Button from "../button/button.component.yml";
import Icon from "../icon/icon.component.yml";
import IconStories from "../icon/icon.stories";

import Card from "./card.component.yml";

import CardBody from "./card-body/card-body.component.yml";
import CardDescription from "./card-description/card-description.component.yml";
import CardFooter from "./card-footer/card-footer.component.yml";
import CardMedia from "./card-media/card-media.component.yml";
import CardTitle from "./card-title/card-title.component.yml";

import "@cityofportland/components-css/utilities.css";

type Props = CardProps & {
  header: string | object;
  body: string | object;
  footer: string | object;
  "inset media": boolean;
  "media position"?: MediaPosition;
  attributes: Record<string, string>;
};

export default {
  title: "Components/Card",
  render: (args) => {
    return `
      ${Card.component({ ...args })}
    `;
  },
  // TODO: Find out why Mike added these lines, which top-align the card in Storybook
  decorators: [(Story) => `<div class="p-lg">${Story()}</div>`],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    as: {
      control: "select",
      options: CARD_ELEMENTS,
      description:
        "The semantic HTML container element of the Card, either article or section",
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
      description: "Whether the horizontal media is on the left or right",
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
} satisfies Meta<Props>;

type Story<T = Props> = StoryObj<T>;

// Basic card
export const Basic: Story<
  Props & {
    title: string;
    description: string;
    button: string;
    imageWidth: number;
    imageHeight: number;
  }
> = {
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
      description: "The width of the image in the card",
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
    controls: {
      exclude: ["header", "footer", "body"],
    },
  },
  render: ({
    as,
    layout,
    border,
    "media position": mediaPosition,
    title,
    description,
    button,
    imageWidth,
    imageHeight,
  }: Props & {
    title: string;
    description: string;
    button: string;
    imageWidth: number;
    imageHeight: number;
  }) => {
    return `
      ${Card.component({
        defaultAttributes: [...Card.args.defaultAttributes],
        as: as,
        layout: layout,
        border: border ?? true,
        card_content: `
          ${
            imageHeight && imageWidth
              ? CardMedia.component({
                  defaultAttributes: [...CardMedia.args.defaultAttributes],

                  position: mediaPosition,
                  card_media_content: `
            <img src="https://picsum.photos/${imageWidth}/${imageHeight}" alt="A random image from Picsum Photos" />
            `,
                })
              : ""
          }

          ${CardBody.component({
            card_body_content: `
            ${CardTitle.component({
              card_title_content: `<h3><a href="#" class="link">${title}</a></h3>`,
            })}
            ${
              description &&
              CardDescription.component({
                card_description_content: `<p>${description}</p>`,
              })
            }
            ${
              button
                ? CardFooter.component({
                    card_footer_content: `
                  ${Button.component({
                    color: "primary",
                    variant: "moderate",
                    button_content: button,
                    defaultAttributes: [
                      ...Button.args.defaultAttributes,
                      ["class", ["rounded-md"]],
                    ],
                  })}
                `,
                  })
                : ""
            }`,
          })}
        `,
      })}
    `;
  },
};

// Multiple cards example
export const MultipleCards: Story<
  Props & {
    title: string;
    description: string;
    button: string;
    imageWidth: number;
    imageHeight: number;
    numCards: number;
  }
> = {
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
      description: "The width of the image in the card",
    },
    numCards: {
      name: "Number of cards",
      control: { type: "number", min: 1, step: 1 },
      description: "The number of cards to display",
    },
  },
  parameters: {
    controls: {
      exclude: ["as", "header", "body", "footer"],
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
  render: ({
    layout,
    border,
    "media position": mediaPosition,
    title,
    description,
    button,
    imageWidth,
    imageHeight,
    numCards,
  }) => `
    <div class="grid md:grid-cols-3 gap-md">
      ${[...Array(numCards)]
        .map(
          (_value, index) => `
        ${Card.component({
          defaultAttributes: [...Card.args.defaultAttributes],
          layout: layout,
          border: border ?? true,
          card_content: `
            ${
              imageWidth && imageHeight
                ? CardMedia.component({
                    defaultAttributes: [...CardMedia.args.defaultAttributes],
                    position: mediaPosition,
                    card_media_content: `
              <img src="https://picsum.photos/${imageWidth}/${imageHeight}?random=${index}" alt="A random image from Picsum Photos" />
              `,
                  })
                : ""
            }
            ${CardBody.component({
              card_body_content: `
              ${CardTitle.component({
                card_title_content: title,
              })}
             ${
               description &&
               CardDescription.component({
                 card_description_content: `<p>${description}</p>`,
               })
             }
              ${
                button &&
                CardFooter.component({
                  card_footer_content: `
                  ${Button.component({
                    defaultAttributes: [
                      ...Button.args.defaultAttributes,
                      ["class", ["rounded-lg"]],
                    ],
                    button_content: button,
                  })}
                `,
                })
              }
              `,
            })}
          `,
        })}
      `
        )
        .join("")}
    </div>
  `,
};

// Multiple buttons card
export const MultipleButtons: Story<Props & { buttons: string[] }> = {
  argTypes: {
    buttons: {
      control: { type: "object" },
      description: "An array of button labels to display in the card footer",
    },
  },
  parameters: {
    controls: {
      exclude: ["as"],
    },
  },
  args: {
    buttons: ["View library information", "View events", "View services"],
    "media position": "left",
  },
  render: ({ layout, border, "media position": mediaPosition, buttons }) => `
      ${Card.component({
        defaultAttributes: [...Card.args.defaultAttributes],
        layout: layout,
        border: border ?? true,
        card_content: `
            ${CardMedia.component({
              defaultAttributes: [...CardMedia.args.defaultAttributes],
              position: mediaPosition,
              card_media_content: `
              <img src="https://picsum.photos/1600/900" alt="A random image from Picsum Photos" />
              `,
            })}
            ${CardBody.component({
              card_body_content: `
              ${CardTitle.component({
                card_title_content: "Find your nearest library",
              })}
             ${CardDescription.component({
               card_description_content: `<p>See hours, events, and services at branches near you.</p>`,
             })}
              ${CardFooter.component({
                defaultAttributes: [
                  ...CardFooter.args.defaultAttributes,
                  ["class", ["inline-flex", "flex-wrap", "gap-sm"]],
                ],
                card_footer_content: `
                  ${buttons
                    .map((button, index) =>
                      Button.component({
                        color: index > 0 ? "secondary" : "primary",
                        variant: "moderate",
                        // outline: index > 0,
                        button_content: button,
                        defaultAttributes: [
                          ...Button.args.defaultAttributes,
                          ["class", ["rounded-md"]],
                        ],
                      })
                    )
                    .join("")}
                `,
              })}
              `,
            })}
          `,
      })}
  `,
};

// Card with icon in header
export const IconStory: Story<Props & { icon: string }> = {
  name: "Icon",
  argTypes: {
    icon: IconStories.argTypes!.icon,
  },
  args: {
    icon: "moon",
  },
  parameters: {
    controls: {
      exclude: ["as", "header", "body", "footer", "inset media"],
    },
  },
  render: ({
    border,
    layout,
    icon,
    "media position": mediaPosition,
  }: Props & { icon: string }) => `
      ${Card.component({
        border: border,
        layout: layout,
        card_content: `
        ${CardMedia.component({
          defaultAttributes: [...CardMedia.args.defaultAttributes],
          position: mediaPosition,
          inset: true,
          card_media_content: `${Icon.component({
            icon,
            size: "lg",
          })}`,
        })}
        ${CardBody.component({
          card_body_content: `
          ${CardTitle.component({
            card_title_content: "Why go to the moon?",
          })}
          <p>We choose to go to the moon and do other things, not because they are easy, but because they are hard.</p>
          ${CardFooter.component({
            card_footer_content: `
             <a class="link" href="#">Learn more</a>
            `,
          })}
          `,
        })}
        `,
      })}
  `,
};
