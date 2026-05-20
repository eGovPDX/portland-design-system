import {
  BOX_COLORS,
  BOX_VARIANTS,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import type { Meta, StoryObj } from "@storybook/html-vite";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import _Box from "../box/box.component.yml";
import Button from "../button/button.component.yml";

import Footer from "./footer.component.yml";
import FooterMenu from "./footer-navigation/footer-menu/footer-menu.component.yml";
import FooterMenuItem from "./footer-navigation/footer-menu/footer-menu-item/footer-menu-item.component.yml";
import FooterMenuTitle from "./footer-navigation/footer-menu/footer-menu-title/footer-menu-title.component.yml";
import FooterNavigation from "./footer-navigation/footer-navigation.component.yml";

library.add(faArrowRight);

const arrowRight = icon({ prefix: "fas", iconName: "arrow-right" });

type StoryProps = {
  content: string | object;
  copyrightStart: number;
  color?: BoxColorScheme;
  variant?: BoxColorVariation;
};

const meta: Meta<StoryProps> = {
  title: "Components/Footer",
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => {
    return `
        ${Footer.component({ ...args })}
      `;
  },
  argTypes: {
    copyrightStart: {
      name: "Copyright start year",
      control: { type: "number", step: 1 },
    },
    color: {
      control: "select",
      options: BOX_COLORS,
      description: "Color scheme for background and content colors",
    },
    variant: {
      control: "select",
      options: BOX_VARIANTS,
      description: "Color variation within the chosen color scheme",
    },
  },
  args: {
    color: "default",
    variant: "moderate",
    copyrightStart: new Date().getFullYear(),
  },
  play: async ({ canvasElement }) => {
    Drupal.attachBehaviors(canvasElement, window.drupalSettings);
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

const linkStyle = `a {
  text-decoration: underline;
  text-underline-offset: 30%;
  text-decoration-thickness: 8%;
}`;

export const PortlandGov: Story = {
  name: "portland.gov",
  parameters: {
    controls: {
      exclude: ["as", "children", "color", "Copyright start year", "variant"],
    },
  },
  render({ copyrightStart: _ }) {
    return `
    <div class="min-h-screen flex flex-col">
      <style>${linkStyle}</style>
      <main class="flex-1 p-xl">
        <article class="max-w-screen-xl mx-auto">
          <h1 class="text-heading-2xl font-bold mb-lg">Page content</h1>
          <section>
            <p>Here is some content for the page.</p>
          </section>
        </article>
      </main>
      ${Footer.component({
        defaultAttributes: [...Footer.args.defaultAttributes],
        color: "default",
        variant: "moderate",
        copyrightStart: 2018,
        footer_content: `
          <section>
            <p>
              See something we could improve on this page?
              <a href="#">Give website feedback.</a>
            </p>
          </section>
          <section class="flex flex-col lg:flex-row items-start gap-xl">
            <div class="space-y-md">
              <p>
                The City of Portland ensures meaningful access to City programs,
                services, and activities to comply with Civil Rights Title VI and
                ADA Title II laws and reasonably provides: translation,
                interpretation, modifications, accommodations, alternative
                formats, auxiliary aids and services.
                <a href="#">Request these services online</a> or
                <a href="tel:503-823-4000">503-823-4000</a>, Relay Service:
                <a href="tel:711">711</a>.
              </p>
              <p>
                <a href="tel:503-823-4000">503-823-4000</a> Traducción e
                Interpretación | Biên Dịch và Thông Dịch | 口笔译服务 | Устный и
                письменный перевод | Turjumaad iyo Fasiraad | Письмовий і усний
                переклад | Traducere și interpretariat | Chiaku me Awewen Kapas |
                अनुवादन तथा व्याख्या
              </p>
            </div>
            ${Button.component({
              right: arrowRight.html.join(" "),
              attributes: { class: "shrink-0" },
              content: "Explore Services",
            })}
          </section>
          ${FooterNavigation.component({
            content: `
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: "General Information" })}
            ${FooterMenuItem.component({ content: `<a href="mailto:311@portlandoregon.gov">311@portlandoregon.gov</a>` })}
            ${FooterMenuItem.component({ content: `<a href="tel:311">311</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">Information and Customer Service</a>` })}
            ${FooterMenuItem.component({ content: `<a href="tel:503-823-4000">503-823-4000</a>` })}
            ${FooterMenuItem.component({ content: `<a href="tel:711">711</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">Oregon Relay Service</a>` })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Terms, policies` })}
            ${FooterMenuItem.component({ content: `<a href="#">ADA Accommodation</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">Captioning, transcription</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">Privacy policy</a>` })}`,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Portland.gov` })}
            ${FooterMenuItem.component({ content: `<a href="#">About this Website</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">Employee Portal</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">Editor log in</a>` })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Social Media` })}
            ${FooterMenuItem.component({ content: `<a href="#">PortlandORGov</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">PortlandGov</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">PortlandGov</a>` })}
            `,
          })}
        `,
          })}
        `,
      })}
    </div>`;
  },
};

export const Wireframe: StoryObj<StoryProps & { menus: number }> = {
  parameters: {
    controls: {
      exclude: ["content"],
    },
  },
  argTypes: {
    menus: {
      name: "Number of FooterMenus",
      control: { type: "number", min: 1, step: 1 },
    },
  },
  args: {
    menus: 3,
  },
  render: ({ color, variant, copyrightStart, menus }) => `
    ${Footer.component({
      defaultAttributes: [...Footer.args.defaultAttributes],
      color,
      variant,
      copyrightStart,
      footer_content: `
      <section class="outline-md outline-offset-6 space-y-md">
        <p>
          The Footer allows you to display important information and navigation
          links at the bottom of your website.
        </p>
        <p>
          It is very flexible, but the only required prop is
          <code>copyrightStart</code>.
        </p>
        <p>
          Below this section is a FooterNavigation sub-component. It should be
          used to group related navigation links together using FooterMenu
          components.
        </p>
        <p>
          The word "pneumonoultramicroscopicsilicovolcanoconiosis" is used
          throughout to demonstrate that the Footer components can handle long
          words and will break them appropriately to avoid overflow issues.
        </p>
      </section>
      ${FooterNavigation.component({
        defaultAttributes: [
          ...FooterNavigation.args.defaultAttributes,
          ["class", ["outline-md", "outline-offset-6"]],
        ],
        content: `
        ${[...Array(menus)]
          .map(
            (_, index) => `
          ${FooterMenu.component({
            defaultAttributes: [
              ...FooterMenu.args.defaultAttributes,
              ["class", ["outline-md", "outline-offset-6"]],
            ],
            id: `menu-${index}`,
            content: `
            ${FooterMenuTitle.component({ id: `menu-${index}`, content: `FooterMenuTitle ${index + 1}` })}
            ${FooterMenuItem.component({ content: `<a href="#">FooterMenuItem 1</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">FooterMenuItem 2</a>` })}
            ${FooterMenuItem.component({ content: `<a href="#">pneumonoultramicroscopicsilicovolcanoconiosis</a>` })}
            `,
          })}  
         `
          )
          .join("")}
         `,
      })}
      `,
    })}
    `,
};

export const Minimal: Story = {
  parameters: {
    controls: {
      exclude: ["content"],
    },
  },
  render: ({ color, variant, copyrightStart }) => `
    <div class="min-h-screen flex flex-col">
      <main class="flex-1 p-xl">
        <article class="max-w-screen-xl mx-auto">
          <h1 class="text-heading-2xl font-bold mb-lg">Page content</h1>
          <section>
            <p>Here is some content for the page.</p>
          </section>
        </article>
      </main>
      ${Footer.component({ defaultAttributes: [...Footer.args.defaultAttributes], copyrightStart, color, variant })}
    </div>`,
};
