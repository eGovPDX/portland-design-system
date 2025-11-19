import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";

import { Button } from "../button";
import {
  Footer,
  FooterContent,
  FooterCopyright,
  FooterMenu,
  FooterMenuItem,
  FooterMenuTitle,
  FooterNavigation,
} from "./footer";

type StoryProps = React.ComponentPropsWithoutRef<typeof Footer>;

const meta: Meta<StoryProps> = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    // Add argTypes based on your Footer component props
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const PortlandGov: Story = {
  args: {
    children: (
      <>
        <FooterContent>
          <section>
            <p>See something we could improve on this page? Give feedback.</p>
          </section>
          <section className="flex flex-col tablet:flex-row items-start gap-xl">
            <div className="grid gap-md">
              <p>
                The City of Portland ensures meaningful access to City programs,
                services, and activities to comply with Civil Rights Title VI
                and ADA Title II laws and reasonably provides: translation,
                interpretation, modifications, accommodations, alternative
                formats, auxiliary aids and services. Request these services
                online or 503-823-4000, Relay Service: 711.
              </p>
              <p>
                503-823-4000 Traducción e Interpretación | Biên Dịch và Thông
                Dịch | 口笔译服务 | Устный и письменный перевод | Turjumaad iyo
                Fasiraad | Письмовий і усний переклад | Traducere și
                interpretariat | Chiaku me Awewen Kapas | अनुवादन तथा व्याख्या
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
            <FooterMenuItem>311@portlandoregon.gov</FooterMenuItem>
            <FooterMenuItem>311</FooterMenuItem>
            <FooterMenuItem>Information and Customer Service</FooterMenuItem>
            <FooterMenuItem>503-823-4000</FooterMenuItem>
            <FooterMenuItem>711</FooterMenuItem>
            <FooterMenuItem>Oregon Relay Service</FooterMenuItem>
          </FooterMenu>
          <FooterMenu>
            <FooterMenuTitle>Terms, policies</FooterMenuTitle>
            <FooterMenuItem>ADA Accommodation</FooterMenuItem>
            <FooterMenuItem>Captioning, transcription</FooterMenuItem>
            <FooterMenuItem>Privacy policy</FooterMenuItem>
          </FooterMenu>
          <FooterMenu>
            <FooterMenuTitle>Portland.gov</FooterMenuTitle>
            <FooterMenuItem>About this Website</FooterMenuItem>
            <FooterMenuItem>Employee Portal</FooterMenuItem>
            <FooterMenuItem>Editor log in</FooterMenuItem>
          </FooterMenu>
          <FooterMenu>
            <FooterMenuTitle>Social Media</FooterMenuTitle>
            <FooterMenuItem>PortlandORGov</FooterMenuItem>
            <FooterMenuItem>PortlandGov</FooterMenuItem>
            <FooterMenuItem>PortlandGov</FooterMenuItem>
          </FooterMenu>
          <FooterCopyright startYear={2018}></FooterCopyright>
        </FooterNavigation>
      </>
    ),
  },
};
