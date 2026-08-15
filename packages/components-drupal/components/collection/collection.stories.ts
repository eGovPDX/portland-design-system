import type { CollectionProps } from "@cityofportland/types/collection";
import type { Meta, StoryObj } from "@storybook/html-vite";

import "@cityofportland/components-css/utilities.css";

import "../box/box.component.yml";
import Card from "../card/card.component.yml";
import CardBody from "../card/card-body/card-body.component.yml";
import CardDescription from "../card/card-description/card-description.component.yml";
import CardMedia from "../card/card-media/card-media.component.yml";
import CardTitle from "../card/card-title/card-title.component.yml";

import Tag from "../tag/tag.component.yml";

import Collection from "./collection.component.yml";
import CollectionItem from "./collection-item/collection-item.component.yml";

type Props = CollectionProps & { as?: string };

export default {
  title: "Components/Collection",
  render: (args) => {
    return `
      ${Collection.component({ ...args })}
    `;
  },
  decorators: [(Story) => `<div class="@container p-lg">${Story()}</div>`],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "ol", "ul"],
      description:
        "The semantic HTML container element of the Collection. These options are only best practice options.",
    },
    divider: {
      control: "boolean",
      description: "Whether the collection has a divider or not",
    },
  },
  args: {
    as: "ul",
    divider: true,
  },
} satisfies Meta<Props>;

type Story<T> = StoryObj<T>;

// Basic card
export const Basic: Story<Props> = {
  render: ({ as, divider }: Props) => {
    return `
      ${Collection.component({
        defaultAttributes: [...Collection.args.defaultAttributes],
        as,
        divider: divider ?? true,
        collection_content: `
          ${CollectionItem.component({
            defaultAttributes: [...CollectionItem.args.defaultAttributes],
            as: as == "div" ? "div" : "li",
            collection_item_content: `
            ${Card.component({
              layout: "horizontal",
              defaultAttributes: [...Card.args.defaultAttributes],
              card_content: `
              ${CardBody.component({
                defaultAttributes: [
                  ...CardBody.args.defaultAttributes,
                  ["class", ["flex flex-col gap-3xs"]],
                ],
                card_body_content: `
                ${CardTitle.component({
                  defaultAttributes: [...CardTitle.args.defaultAttributes],
                  card_title_content: `
                    <h3><a href="#" class="link">Preparing for a paperless future</a></h3>
                  `,
                })}
                `,
              })}
              `,
            })}
            `,
          })}
          ${CollectionItem.component({
            defaultAttributes: [...CollectionItem.args.defaultAttributes],
            as: as == "div" ? "div" : "li",
            collection_item_content: `
            ${Card.component({
              layout: "horizontal",
              defaultAttributes: [...Card.args.defaultAttributes],
              card_content: `
              ${CardBody.component({
                defaultAttributes: [
                  ...CardBody.args.defaultAttributes,
                  ["class", ["flex flex-col gap-3xs"]],
                ],
                card_body_content: `
                  ${CardTitle.component({
                    defaultAttributes: [...CardTitle.args.defaultAttributes],
                    card_title_content: `
                      <h3><a href="#" class="link">Women-owned small business dashboard</a></h3>
                    `,
                  })}
                  ${CardDescription.component({
                    defaultAttributes: [
                      ...CardDescription.args.defaultAttributes,
                    ],
                    card_description_content: `
                      <p>In honor of National Women's Small Business Month, we've partnered with SBA's Office of Government Contracting and Business Development and Office of Program Performance, Analysis, and Evaluation to highlight the Women-Owned Small Businesses (WOSBs) data dashboard!</p>
                    `,
                  })}`,
              })}`,
            })}`,
          })}
          ${CollectionItem.component({
            defaultAttributes: [...CollectionItem.args.defaultAttributes],
            as: as == "div" ? "div" : "li",
            collection_item_content: `
              ${Card.component({
                layout: "horizontal",
                defaultAttributes: [...Card.args.defaultAttributes],
                card_content: `
                  ${CardMedia.component({
                    defaultAttributes: [...CardMedia.args.defaultAttributes],
                    card_media_content: `
                      <img src="https://picsum.photos/1600/900" alt="A random image from Picsum Photos" />
                    `,
                  })}
                  ${CardBody.component({
                    defaultAttributes: [
                      ...CardBody.args.defaultAttributes,
                      ["class", ["flex flex-col gap-3xs"]],
                    ],
                    card_body_content: `
                      ${CardTitle.component({
                        defaultAttributes: [
                          ...CardTitle.args.defaultAttributes,
                        ],
                        card_title_content: `
                          <h3 class="heading-md"><a href="#" class="link">Neighborhood Park Improvements</a></h3>
                        `,
                      })}
                      ${CardDescription.component({
                        defaultAttributes: [
                          ...CardDescription.args.defaultAttributes,
                        ],
                        card_description_content: `
                          <p>See planned improvements, construction schedules, and opportunities to share feedback about your local park.</p>
                          <span class="py-3xs text-body-sm text-standard-default-moderate">Updated three days ago</span>
                          <div class="py-2xs flex flex-wrap gap-xs">
                            ${Tag.component({ variant: "info", content: "{tagText}" })}
                            ${Tag.component({ variant: "info", content: "{tagText}" })}
                            ${Tag.component({ variant: "info", content: "{tagText}" })}
                            ${Tag.component({ variant: "info", content: "{tagText}" })}
                          </div>
                        `,
                      })}
                    `,
                  })}
                `,
              })}
            `,
          })}
        `,
      })}
    `;
  },
};
