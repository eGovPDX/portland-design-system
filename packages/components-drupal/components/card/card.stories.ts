import {
  CARD_LAYOUTS,
  MEDIA_POSITIONS,
  type CardProps,
  type MediaPosition,
} from "@cityofportland/types/card";
import type { Meta, StoryObj } from "@storybook/html-vite";

import Card from "./card.component.yml";
import CardMedia from "./card-media/card-media.component.yml";
import CardIcon from "./card-icon/card-icon.component.yml";
import CardTitle from "./card-title/card-title.component.yml";
import Button from "../button/button.component.yml";

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
  argTypes: {
    layout: {
      control: "select",
      options: CARD_LAYOUTS,
      description: "The layout of the Card, either horizontal or vertical",
    },
    header: {
      control: "object",
      description: "The header content of the Card",
    },
    body: {
      control: "object",
      description: "The body content of the Card",
    },
    footer: {
      control: "object",
      description: "The footer content of the Card",
    },
    "inset media": {
      control: "boolean",
      description: "Whether the vertical media is inset",
      if: {
        arg: "layout",
        eq: "vertical",
      },
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
    layout: "vertical",
    "inset media": false,
    "media position": undefined,
  },
} satisfies Meta<Props>;

type Story<T = Props> = StoryObj<T>;

// Basic card
export const Basic: Story<
  Props & { title: string; description: string; button: boolean; width: string }
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
      control: "boolean",
      description: "Whether to display a button in the footer",
    },
    width: {
      control: "text",
      description: "The width of the card",
    },
  },
  args: {
    title: "Card title",
    description: "<p>Card description goes here.</p>",
    button: false,
    width: "default",
  },
  parameters: {
    controls: {
      exclude: ["header", "footer", "body"],
    },
  },
  render: ({
    layout,
    "inset media": insetMedia,
    "media position": mediaPosition,
    title,
    description,
    button,
    width,
  }: Props & {
    title: string;
    description: string;
    button: boolean;
    width: string;
  }) => {
    if (width === "default") {
      width = layout === "vertical" ? "18.625rem" : "30rem";
    }
    return `
      ${Card.component({
        defaultAttributes: [
          ...Card.args.defaultAttributes,
          ["style", [`width: ${width};`]],
        ],
        layout: layout,
        header: `
          ${CardMedia.component({
            src: "https://picsum.photos/400/300",
            alt: "A random image from Picsum Photos",
            inset: insetMedia,
            position: mediaPosition,
          })}
          `,
        body: `
          ${CardTitle.component({
            content: title,
          })}
          ${description}
        `,
        footer: `
          ${button ? Button.component({ content: "Button" }) : ""}
        `,
      })}
    `;
  },
};

// Multiple cards example
export const MultipleCards: Story = {
  parameters: {
    controls: {
      exclude: ["header", "body", "footer"],
    },
  },
  render: ({
    layout,
    "inset media": insetMedia,
    "media position": mediaPosition,
  }) => `
    <div class="flex flex-wrap gap-x-lg gap-y-2xl">
      ${Card.component({
        defaultAttributes: [
          ...Card.args.defaultAttributes,
          ["class", [layout === "vertical" ? "w-[18.625rem]" : "w-[30rem]"]],
        ],
        layout: layout,
        header: `
          ${CardMedia.component({
            src: "https://images.unsplash.com/photo-1696219364452-c86ede101a60?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Portland tram rising above the city",
            inset: insetMedia,
            position: mediaPosition,
          })}
        `,
        body: `
          ${CardTitle.component({
            content: "Transit options",
          })}
          <p>Portland offers a variety of public transit options.</p>
        `,
        footer: `
          ${Button.component({
            content: "Learn more",
          })}
        `,
      })}
      ${Card.component({
        defaultAttributes: [
          ...Card.args.defaultAttributes,
          ["class", [layout === "vertical" ? "w-[18.625rem]" : "w-[30rem]"]],
        ],
        layout: layout,
        header: `
          ${CardMedia.component({
            src: "https://plus.unsplash.com/premium_photo-1681488503746-0e2cfffb5b36?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "A yellow, green, and blue recycling container",
            inset: insetMedia,
            position: mediaPosition,
          })}
        `,
        body: `
          ${CardTitle.component({
            content: "Recycling done right",
          })}
          <p>Learn the do's and don'ts of proper recycling.</p>
        `,
        footer: `
          ${Button.component({
            content: "Learn more",
          })}
        `,
      })}
      ${Card.component({
        defaultAttributes: [
          ...Card.args.defaultAttributes,
          ["class", [layout === "vertical" ? "w-[18.625rem]" : "w-[30rem]"]],
        ],
        layout: layout,
        header: `
          ${CardMedia.component({
            src: "https://images.unsplash.com/photo-1598550615486-3e0ed6fd7e31?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "A hiker looks out over a valley at a distant volcano",
            inset: insetMedia,
            position: mediaPosition,
          })}
        `,
        body: `
          ${CardTitle.component({
            content: "Adventure awaits",
          })}
          <p>Discover the best spots for hiking and camping around Portland.</p>
        `,
        footer: `
          ${Button.component({
            content: "Learn more",
          })}
        `,
      })}
    </div>
  `,
};

// Multiple buttons card
export const MultipleButtons: Story = {
  parameters: {
    controls: {
      exclude: ["header", "body", "footer"],
    },
  },
  render: ({
    layout,
    "inset media": insetMedia,
    "media position": mediaPosition,
  }) => `
      ${Card.component({
        defaultAttributes: [
          ...Card.args.defaultAttributes,
          ["class", [layout === "vertical" ? "w-[18.625rem]" : "w-[30rem]"]],
        ],
        layout: layout,
        header: `
          ${CardMedia.component({
            src: "https://images.unsplash.com/photo-1777195680756-8aa4f1d00162?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "A cresent Earth as seen from the lunar surface",
            inset: insetMedia,
            position: mediaPosition,
          })}
        `,
        body: `
          ${CardTitle.component({
            content: "Next lunar mission",
          })}
          <p>Establish a permanent base on the south pole of the moon.</p>
        `,
        footer: `
          ${Button.component({
            content: "Continue",
          })}
          ${Button.component({
            content: "Abort",
            variant: "secondary",
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>
    `,
  },
  parameters: {
    controls: {
      exclude: ["header", "body", "footer", "inset media"],
    },
  },
  render: ({
    layout,
    icon,
    "media position": mediaPosition,
  }: Props & { icon: string }) => `
      ${Card.component({
        defaultAttributes: [
          ...Card.args.defaultAttributes,
          ["class", [layout === "vertical" ? "w-[18.625rem]" : "w-[30rem]"]],
        ],
        layout: layout,
        header: `
        ${CardIcon.component({
          icon: `
            ${icon}  
          `,
          label: "Rocket icon",
          position: mediaPosition,
        })}
          `,
        body: `
          ${CardTitle.component({
            content: "Why go to the moon?",
          })}
          <p>We choose to go to the moon and do other things, not because they are easy, but because they are hard.</p>
        `,
        footer: `
          <!-- REFACTOR: Use link classes -->
          <a class="text-(--text-color-primary-moderate)" href="#">Learn more</a>
        `,
      })}
      <hr class="my-2xl" />
      <h2 class="heading-md">How to change the icon</h2>
      <!-- REFACTOR: Use list classes -->
      <ol class="list-decimal pl-lg">
        <li><a class="text-(--text-color-primary-moderate)" href="https://fontawesome.com/search?ip=classic&ic=free-collection" target="_blank">Browse Font Awesome icons</a></li>
        <li>Click on the desired icon and copy the SVG markup (not the "Full SVG" markup)</li>
        <li>Paste the SVG markup into the <em>icon</em> control in Storybook</li>
      </ol>
  `,
};
