import type { Meta, StoryObj } from "@storybook/html-vite";

import Button from "../button/button.component.yml";

import Footer from "./footer.component.yml";
import FooterContent from "./footer-content/footer-content.component.yml";
import FooterCopyright from "./footer-navigation/footer-copyright/footer-copyright.component.yml";
import FooterMenu from "./footer-navigation/footer-menu/footer-menu.component.yml";
import FooterMenuItem from "./footer-navigation/footer-menu/footer-menu-item/footer-menu-item.component.yml";
import FooterMenuTitle from "./footer-navigation/footer-menu/footer-menu-title/footer-menu-title.component.yml";
import FooterNavigation from "./footer-navigation/footer-navigation.component.yml";

type StoryProps = {
  content: string | object;
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
    // Add argTypes based on your Footer component props
  },
  play: async ({ canvasElement }) => {
    Drupal.attachBehaviors(canvasElement, window.drupalSettings);
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const PortlandGov: Story = {
  args: {
    content: `
    ${FooterContent.component({
      content: `
        <section>
          <p>See something we could improve on this page? Give feedback.</p>
        </section>
        <section class="flex flex-col tablet:flex-row items-start gap-xl">
          <div class="grid gap-md">
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
          ${Button.component({
            right: "right-arrow",
            attributes: {
              class: "shrink-0",
            },
            content: "Explore Services",
          })}
        </section>
        ${FooterNavigation.component({
          content: `
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: "General Information" })}
            ${FooterMenuItem.component({ content: "311@portlandoregon.gov" })}
            ${FooterMenuItem.component({ content: "311" })}
            ${FooterMenuItem.component({ content: "Information and Customer Service" })}
            ${FooterMenuItem.component({ content: "503-823-4000" })}
            ${FooterMenuItem.component({ content: "711" })}
            ${FooterMenuItem.component({ content: "Oregon Relay Service" })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Terms, policies` })}
            ${FooterMenuItem.component({ content: "ADA Accommodation" })}
            ${FooterMenuItem.component({ content: "Captioning, transcription" })}
            ${FooterMenuItem.component({ content: "Privacy policy" })}`,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Portland.gov` })}
            ${FooterMenuItem.component({ content: "About this Website" })}
            ${FooterMenuItem.component({ content: "Employee Portal" })}
            ${FooterMenuItem.component({ content: "Editor log in" })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Social Media` })}
            ${FooterMenuItem.component({ content: "PortlandORGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            `,
          })}
          ${FooterCopyright.component({ startYear: 2018 })}
        `,
        })}
      `,
    })}`,
  },
};

export const ManyMenus: Story = {
  args: {
    content: `
    ${FooterContent.component({
      content: `
      ${FooterNavigation.component({
        content: `
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: "General Information" })}
            ${FooterMenuItem.component({ content: "311@portlandoregon.gov" })}
            ${FooterMenuItem.component({ content: "311" })}
            ${FooterMenuItem.component({ content: "Information and Customer Service" })}
            ${FooterMenuItem.component({ content: "503-823-4000" })}
            ${FooterMenuItem.component({ content: "711" })}
            ${FooterMenuItem.component({ content: "Oregon Relay Service" })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Terms, policies` })}
            ${FooterMenuItem.component({ content: "ADA Accommodation" })}
            ${FooterMenuItem.component({ content: "Captioning, transcription" })}
            ${FooterMenuItem.component({ content: "Privacy policy" })}`,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Portland.gov` })}
            ${FooterMenuItem.component({ content: "About this Website" })}
            ${FooterMenuItem.component({ content: "Employee Portal" })}
            ${FooterMenuItem.component({ content: "Editor log in" })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Social Media` })}
            ${FooterMenuItem.component({ content: "PortlandORGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Social Media` })}
            ${FooterMenuItem.component({ content: "PortlandORGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: "General Information" })}
            ${FooterMenuItem.component({ content: "311@portlandoregon.gov" })}
            ${FooterMenuItem.component({ content: "311" })}
            ${FooterMenuItem.component({ content: "Information and Customer Service" })}
            ${FooterMenuItem.component({ content: "503-823-4000" })}
            ${FooterMenuItem.component({ content: "711" })}
            ${FooterMenuItem.component({ content: "Oregon Relay Service" })}
            `,
          })}
          ${FooterMenu.component({
            content: `
            ${FooterMenuTitle.component({ content: `Social Media` })}
            ${FooterMenuItem.component({ content: "PortlandORGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            ${FooterMenuItem.component({ content: "PortlandGov" })}
            `,
          })}
          ${FooterCopyright.component({ startYear: 2018 })}
        `,
      })}
      `,
    })}`,
  },
};
