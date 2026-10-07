import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "../card/card";
import { CardBody } from "../card/card-body";
import { CardDescription } from "../card/card-description";
import { CardMedia } from "../card/card-media";
import { CardTitle } from "../card/card-title";
import { Tag } from "../tag";

import { Collection, type ReactCollectionProps } from "./collection";
import { CollectionItem } from "./collection-item";

export default {
  title: "Components/Collection",
  component: Collection,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) => (
      <div className="@container p-lg">
        <>{story()}</>
      </div>
    ),
  ],
  argTypes: {
    as: {
      control: "select",
      options: ["div", "ol", "ul"],
      description:
        "The semantic HTML container element of the Collection. These options are only best practice options.",
    },
    divider: {
      control: "boolean",
      description: "Whether the collection has a divider between items",
    },
  },
  args: {
    as: "ul",
    divider: true,
  },
} satisfies Meta<ReactCollectionProps>;

type Story = StoryObj<ReactCollectionProps>;

export const Basic: Story = {
  parameters: {
    controls: { exclude: ["className", "children"] },
  },
  render: ({ as, divider }) => (
    <Collection as={as} divider={divider}>
      <CollectionItem as={as === "div" ? "div" : "li"}>
        <Card layout="horizontal" border={false}>
          <CardBody className="flex flex-col gap-3xs">
            <CardTitle>
              <h3>
                <a href="#" className="link">
                  Preparing for a paperless future
                </a>
              </h3>
            </CardTitle>
          </CardBody>
        </Card>
      </CollectionItem>
      <CollectionItem as={as === "div" ? "div" : "li"}>
        <Card layout="horizontal" border={false}>
          <CardBody className="flex flex-col gap-3xs">
            <CardTitle>
              <h3>
                <a href="#" className="link">
                  Women-owned small business dashboard
                </a>
              </h3>
            </CardTitle>
            <CardDescription>
              <p>
                In honor of National Women&apos;s Small Business Month,
                we&apos;ve partnered with SBA&apos;s Office of Government
                Contracting and Business Development and Office of Program
                Performance, Analysis, and Evaluation to highlight the
                Women-Owned Small Businesses (WOSBs) data dashboard!
              </p>
            </CardDescription>
          </CardBody>
        </Card>
      </CollectionItem>
      <CollectionItem as={as === "div" ? "div" : "li"}>
        <Card layout="horizontal" border={false}>
          <CardMedia position="left">
            <img
              src="https://picsum.photos/1600/900"
              alt="A random image from Picsum Photos"
            />
          </CardMedia>
          <CardBody className="flex flex-col gap-3xs">
            <CardTitle>
              <h3 className="heading-md">
                <a href="#" className="link">
                  Neighborhood Park Improvements
                </a>
              </h3>
            </CardTitle>
            <CardDescription>
              <p>
                See planned improvements, construction schedules, and
                opportunities to share feedback about your local park.
              </p>
              <span className="py-3xs text-body-sm text-standard-default-moderate">
                Updated three days ago
              </span>
              <div className="py-2xs flex flex-wrap gap-xs">
                <Tag variant="info">Parks</Tag>
                <Tag variant="info">Construction</Tag>
                <Tag variant="info">Feedback</Tag>
                <Tag variant="info">Neighborhood</Tag>
              </div>
            </CardDescription>
          </CardBody>
        </Card>
      </CollectionItem>
    </Collection>
  ),
};
