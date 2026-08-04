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
                    content: button,
                    defaultAttributes: [
                      ...CardMedia.args.defaultAttributes,
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
                  ${Button.component({ defaultAttributes: [...CardMedia.args.defaultAttributes, ["class", ["rounded-lg"]]], content: button })}
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
                        content: button,
                        defaultAttributes: [
                          ...CardMedia.args.defaultAttributes,
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
export const Icon: Story<Props & { icon: string }> = {
  argTypes: {
    icon: {
      control: "text",
      description: "The SVG markup for the icon to display in the header",
    },
  },
  args: {
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5xl h-5xl"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>
    `,
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
          card_media_content: icon,
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
      <hr class="my-2xl" />
      <h2 class="heading-md">How to change the icon</h2>
      <!-- REFACTOR: Use list utility class -->
      <ol class="list-decimal pl-lg">
        <li><a class="link" href="https://fontawesome.com/search?ip=classic&ic=free-collection" target="_blank">Browse Font Awesome icons</a></li>
        <li>Click on the desired icon and copy the SVG markup (not the "Full SVG" markup)</li>
        <li>Paste the SVG markup into the <em>icon</em> control in Storybook</li>
      </ol>
  `,
};
