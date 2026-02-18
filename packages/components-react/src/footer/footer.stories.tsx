import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";

import BoxStories from "../box/box.stories";
import { Button } from "../button";
import {
  Footer,
  FooterContent,
  FooterCopyright,
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
  },
  args: {
    color: "default",
    variant: "moderate",
  },
};

export default meta;

type Story = StoryObj<ReactFooterProps>;

export const PortlandGov: Story = {
  name: "portland.gov",
  parameters: {
    controls: {
      exclude: ["children", "color", "variant"],
    },
  },
  render: (args) => (
    <div className="min-h-screen grid">
      <style>
        {`a {
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
        }`}
      </style>
      <Box
        as="main"
        color="default"
        variant="subtle"
        className="w-full max-w-screen-xl flex flex-col justify-self-center py-xl px-md lg:px-none"
      >
        <h1 className="text-heading-2xl font-bold mb-lg">Page content</h1>
        <section>
          <p>Here is some content for the page.</p>
        </section>
      </Box>
      <Footer {...args}>
        <FooterContent>
          <section>
            <p>
              See something we could improve on this page?{" "}
              <a href="#">Give website feedback.</a>
            </p>
          </section>
          <section className="flex flex-col lg:flex-row items-start gap-xl">
            <div className="grid gap-md">
              <p>
                The City of Portland ensures meaningful access to City programs,
                services, and activities to comply with Civil Rights Title VI
                and ADA Title II laws and reasonably provides: translation,
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
                переклад | Traducere și interpretariat | Chiaku me Awewen Kapas
                | अनुवादन तथा व्याख्या
              </p>
            </div>
            <Button
              right={<FontAwesomeIcon icon={faArrowRight} />}
              className="shrink-0"
            >
              Explore Services
            </Button>
          </section>
        </FooterContent>
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
          <FooterCopyright startYear={2018}></FooterCopyright>
        </FooterNavigation>
      </Footer>
    </div>
  ),
};

export const Wireframe: Story = {
  parameters: {
    controls: {
      exclude: ["as", "children"],
    },
  },
  render: (args) => (
    <Footer {...args}>
      <FooterContent className="border-md p-sm">
        <p>
          This is the FooterContent sub-component. It should be used to display
          additional information or links related to the footer.
        </p>
      </FooterContent>
      <div className="border-md p-sm">
        <p className="mb-md">
          This is the FooterNavigation sub-component. It should be used to
          display navigation links inside FooterMenu components. As demonstrated
          below, the FooterMenu component should be used to group related
          navigation links together, and the FooterMenuTitle component should be
          used to provide a title for each group of navigation links. The
          FooterMenuItem component should be used to display individual
          navigation links within each FooterMenu.
        </p>
        <FooterNavigation>
          <FooterMenu className="border-md p-sm">
            <p>
              This is a FooterMenu sub-component. It should be used to group
              related navigation links together.
            </p>
            <FooterMenuTitle>FooterMenuTitle</FooterMenuTitle>
            <FooterMenuItem>FooterMenuItem 1</FooterMenuItem>
            <FooterMenuItem>FooterMenuItem 2</FooterMenuItem>
          </FooterMenu>
          <FooterMenu className="border-md p-sm">
            <p>
              This is a FooterMenu sub-component. It should be used to group
              related navigation links together.
            </p>
            <FooterMenuTitle>FooterMenuTitle</FooterMenuTitle>
            <FooterMenuItem>FooterMenuItem 1</FooterMenuItem>
            <FooterMenuItem>FooterMenuItem 2</FooterMenuItem>
          </FooterMenu>
          <FooterCopyright
            startYear={2026}
            className="border-md p-sm"
          ></FooterCopyright>
        </FooterNavigation>
      </div>
    </Footer>
  ),
};
