import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { FooterMenu, FooterMenuItem, FooterMenuTitle } from "../footer";

describe("FooterMenu", () => {
  // Use 'async' here because we are awaiting the rejection.
  test("throws error without FooterMenuTitle", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    // The render function call returns a promise that rejects.
    const renderPromise = render(
      <FooterMenu>
        <FooterMenuItem>Item 1</FooterMenuItem>
      </FooterMenu>
    );

    // We must 'await' the expect(...).rejects call. This tells Vitest
    // to wait for the promise to settle and properly handle the rejection.
    await expect(renderPromise).rejects.toThrow(
      "FooterMenu must contain a FooterMenuTitle component for accessibility."
    );

    spy.mockRestore();
  });

  test("renders correctly with FooterMenuTitle", async () => {
    const { getByText } = await render(
      <FooterMenu>
        <FooterMenuTitle>Menu Title</FooterMenuTitle>
        <FooterMenuItem>Item 1</FooterMenuItem>
      </FooterMenu>
    );

    expect(getByText("Menu Title")).toBeInTheDocument();
    expect(getByText("Item 1")).toBeInTheDocument();
  });
});
