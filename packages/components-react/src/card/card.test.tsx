import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
} from "./index";

describe("Card", () => {
  test("renders a vertical bordered article by default", async () => {
    const { getByRole } = await render(<Card>Card content</Card>);
    const card = getByRole("article");

    await expect.element(card).toHaveClass("card");
    await expect.element(card).toHaveClass("card--vertical");
    await expect.element(card).toHaveClass("card--bordered");
    await expect.element(card).toHaveTextContent("Card content");
  });

  test("supports the Drupal card layout contract", async () => {
    const { getByRole } = await render(
      <Card
        as="section"
        layout="horizontal"
        border={false}
        aria-label="Library card"
      >
        <div className="card__media">Media</div>
        <CardBody>Body</CardBody>
      </Card>
    );
    const card = getByRole("region", { name: "Library card" });

    await expect.element(card).toHaveClass("card--horizontal");
    await expect.element(card).not.toHaveClass("card--bordered");
    await expect.element(card).toHaveTextContent("Media");
    await expect.element(card).toHaveTextContent("Body");
  });

  test("renders a Box-backed body with the card body class", async () => {
    const { getByText } = await render(
      <CardBody as="section" aria-label="Card body">
        Body content
      </CardBody>
    );
    const body = getByText("Body content");

    await expect.element(body).toHaveClass("card__body");
    await expect.element(body).toHaveAttribute("aria-label", "Card body");
  });

  test("renders a Box-backed description with the card description class", async () => {
    const { getByText } = await render(
      <CardDescription as="section" aria-label="Card description">
        Description content
      </CardDescription>
    );
    const description = getByText("Description content");

    await expect.element(description).toHaveClass("card__description");
    await expect
      .element(description)
      .toHaveAttribute("aria-label", "Card description");
  });

  test("renders a Box-backed title with the card title classes", async () => {
    const { getByRole } = await render(
      <CardTitle aria-label="Card title">Title content</CardTitle>
    );
    const title = getByRole("banner", { name: "Card title" });

    await expect.element(title).toHaveClass("card__title");
    await expect.element(title).toHaveClass("heading-md");
    await expect.element(title).toHaveTextContent("Title content");
  });

  test("renders a Box-backed footer with the card footer class", async () => {
    const { getByRole } = await render(
      <CardFooter aria-label="Card actions">Footer content</CardFooter>
    );
    const footer = getByRole("contentinfo", { name: "Card actions" });

    await expect.element(footer).toHaveClass("card__footer");
    await expect.element(footer).toHaveTextContent("Footer content");
  });

  test("renders a Box-backed media figure with position classes", async () => {
    const { getByRole } = await render(
      <CardMedia inset position="right">
        <img src="/library.jpg" alt="Library" />
      </CardMedia>
    );
    const media = getByRole("figure");
    const image = getByRole("img", { name: "Library" });

    await expect.element(media).toHaveClass("card__media");
    await expect.element(media).toHaveClass("card__media--inset");
    await expect.element(media).toHaveClass("card__media--right");
    await expect.element(image).toHaveAttribute("src", "/library.jpg");
  });
});
