import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";

import BoxStories from "../box/box.stories";
import { Button } from "../button";
import {
  Footer,
  FooterMenu,
  FooterMenuItem,
  FooterMenuTitle,
  FooterNavigation,
  type ReactFooterProps,
} from "./footer";
import { Box } from "../box";

const meta: Meta<ReactFooterProps> = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["as"],
    },
  },
  argTypes: {
    ...BoxStories.argTypes,
    // Add argTypes based on your Footer component props
    copyrightStart: {
      name: "Copyright start year",
      type: "number",
    },
  },
  args: {
    color: "default",
    variant: "moderate",
    copyrightStart: new Date().getFullYear(),
  },
};

export default meta;

type Story = StoryObj<ReactFooterProps>;

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
  render: (_args) => (
    <div className="min-h-screen flex flex-col">
      <style>{linkStyle}</style>
      <Box
        as="main"
        color="default"
        variant="subtle"
        className="flex-1 w-full max-w-screen-xl mx-auto p-xl"
      >
        <h1 className="text-heading-2xl font-bold mb-lg">Page content</h1>
        <section>
          <p>Here is some content for the page.</p>
        </section>
      </Box>
      <Footer copyrightStart={2018}>
        <section>
          <p>
            See something we could improve on this page?{" "}
            <a href="#">Give website feedback.</a>
          </p>
        </section>
        <section className="flex flex-col lg:flex-row items-start gap-xl">
          <div>
            <p>
              The City of Portland ensures meaningful access to City programs,
              services, and activities to comply with Civil Rights Title VI and
              ADA Title II laws and reasonably provides: translation,
              interpretation, modifications, accommodations, alternative
              formats, auxiliary aids and services.{" "}
              <a href="#">Request these services online</a> or{" "}
              <a href="tel:503-823-4000">503-823-4000</a>, Relay Service:{" "}
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
          <Button
            right={<FontAwesomeIcon icon={faArrowRight} />}
            className="shrink-0"
          >
            Explore Services
          </Button>
        </section>
        <FooterNavigation>
          <FooterMenu>
            <FooterMenuTitle>General Information</FooterMenuTitle>
            <FooterMenuItem>
              <a href="mailto:311@portlandoregon.gov">311@portlandoregon.gov</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="tel:311">311</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">Information and Customer Service</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="tel:503-823-4000">503-823-4000</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="tel:711">711</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">Oregon Relay Service</a>
            </FooterMenuItem>
          </FooterMenu>
          <FooterMenu>
            <FooterMenuTitle>Terms, policies</FooterMenuTitle>
            <FooterMenuItem>
              <a href="#">ADA Accommodation</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">Captioning, transcription</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">Privacy policy</a>
            </FooterMenuItem>
          </FooterMenu>
          <FooterMenu>
            <FooterMenuTitle>Portland.gov</FooterMenuTitle>
            <FooterMenuItem>
              <a href="#">About this Website</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">Employee Portal</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">Editor log in</a>
            </FooterMenuItem>
          </FooterMenu>
          <FooterMenu>
            <FooterMenuTitle>Social Media</FooterMenuTitle>
            <FooterMenuItem>
              <a href="#">PortlandORGov</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">PortlandGov</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">PortlandGov</a>
            </FooterMenuItem>
          </FooterMenu>
        </FooterNavigation>
      </Footer>
    </div>
  ),
};

export const Wireframe: StoryObj<ReactFooterProps & { menus: number }> = {
  parameters: {
    controls: {
      exclude: ["as", "children"],
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
  render: ({ color, copyrightStart, menus, variant }) => (
    <Footer copyrightStart={copyrightStart} color={color} variant={variant}>
      <style>{linkStyle}</style>
      <section className="outline-md outline-offset-6">
        <p>
          The Footer allows you to display important information and navigation
          links at the bottom of your website.
        </p>
        <p>
          It is very flexible, but the only required prop is{" "}
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
      <FooterNavigation className="outline-md outline-offset-6">
        {[...Array(menus)].map((_, index) => (
          <FooterMenu key={index} className="outline-md outline-offset-6">
            <FooterMenuTitle>FooterMenuTitle {index}</FooterMenuTitle>
            <FooterMenuItem>
              <a href="#">FooterMenuItem 1</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">FooterMenuItem 2</a>
            </FooterMenuItem>
            <FooterMenuItem>
              <a href="#">pneumonoultramicroscopicsilicovolcanoconiosis</a>
            </FooterMenuItem>
          </FooterMenu>
        ))}
      </FooterNavigation>
    </Footer>
  ),
};

export const Minimal: Story = {
  parameters: {
    controls: {
      exclude: ["as", "children"],
    },
  },
  render: ({ color, copyrightStart, variant }) => (
    <div className="min-h-screen flex flex-col">
      <style>{linkStyle}</style>
      <Box
        as="main"
        color="default"
        variant="subtle"
        className="flex-1 w-full max-w-screen-xl mx-auto p-xl"
      >
        <h1 className="text-heading-2xl font-bold mb-lg">Page content</h1>
        <section>
          <p>Here is some content for the page.</p>
        </section>
      </Box>
      <Footer
        copyrightStart={copyrightStart}
        color={color}
        variant={variant}
      ></Footer>
    </div>
  ),
};
