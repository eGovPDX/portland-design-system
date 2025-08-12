import { html } from 'lit';
import '../Button.js';

export default {
  title: 'Components/Button',
  component: 'portland-button',
  parameters: {
    docs: {
      description: {
        component: 'A button draws attention to important actions with a large selectable surface. Built with Lit Web Components.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'accent-cool', 'accent-warm', 'base', 'outline', 'outline-inverse'],
      description: 'The visual style of the button'
    },
    size: {
      control: 'select',
      options: ['default', 'big'],
      description: 'The size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    ariaDisabled: {
      control: 'boolean',
      description: 'Whether the button is aria-disabled'
    },
    unstyled: {
      control: 'boolean',
      description: 'Whether the button should be unstyled'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The button type'
    },
    startIcon: {
      control: 'text',
      description: 'Icon class name to display before the button text (e.g., "fas fa-arrow-left")'
    },
    endIcon: {
      control: 'text',
      description: 'Icon class name to display after the button text (e.g., "fas fa-arrow-right")'
    }
  }
};

const Template = (args) => {
  const {
    variant = 'default',
    size = 'default',
    disabled = false,
    ariaDisabled = false,
    unstyled = false,
    type = 'button',
    startIcon = '',
    endIcon = '',
    text = 'Button'
  } = args;

  return html`
    <portland-button
      variant="${variant}"
      size="${size}"
      ?disabled="${disabled}"
      ?aria-disabled="${ariaDisabled}"
      ?unstyled="${unstyled}"
      type="${type}"
      start-icon="${startIcon}"
      end-icon="${endIcon}"
      @portland-button-click="${(e) => console.log('Button clicked:', e.detail)}"
    >
      ${text}
    </portland-button>
  `;
};

export const Default = Template.bind({});
Default.args = {
  text: 'Default Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  text: 'Secondary Button'
};

export const AccentCool = Template.bind({});
AccentCool.args = {
  variant: 'accent-cool',
  text: 'Accent Cool Button'
};

export const AccentWarm = Template.bind({});
AccentWarm.args = {
  variant: 'accent-warm',
  text: 'Accent Warm Button'
};

export const Base = Template.bind({});
Base.args = {
  variant: 'base',
  text: 'Base Button'
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  text: 'Outline Button'
};

export const OutlineInverse = Template.bind({});
OutlineInverse.args = {
  variant: 'outline-inverse',
  text: 'Outline Inverse Button'
};
OutlineInverse.parameters = {
  backgrounds: { default: 'dark' }
};

export const Big = Template.bind({});
Big.args = {
  size: 'big',
  text: 'Big Button'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  text: 'Disabled Button'
};

export const Unstyled = Template.bind({});
Unstyled.args = {
  unstyled: true,
  text: 'Unstyled Button'
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  startIcon: 'fas fa-arrow-left',
  text: 'Button with Start Icon'
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  endIcon: 'fas fa-arrow-right',
  text: 'Button with End Icon'
};

export const WithBothIcons = Template.bind({});
WithBothIcons.args = {
  startIcon: 'fas fa-download',
  endIcon: 'fas fa-external-link-alt',
  text: 'Download & Open'
};

// Showcase all variants
export const AllVariants = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
    <portland-button>Default</portland-button>
    <portland-button variant="secondary">Secondary</portland-button>
    <portland-button variant="accent-cool">Accent Cool</portland-button>
    <portland-button variant="accent-warm">Accent Warm</portland-button>
    <portland-button variant="base">Base</portland-button>
    <portland-button variant="outline">Outline</portland-button>
    <portland-button variant="outline-inverse" style="background: #1b1b1b; padding: 0.5rem;">Outline Inverse</portland-button>
  </div>
`;

// Showcase all sizes
export const AllSizes = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
    <portland-button>Default Size</portland-button>
    <portland-button size="big">Big Size</portland-button>
  </div>
`;

// Interactive example
export const Interactive = () => {
  const handleClick = (e) => {
    alert(`Button clicked! Variant: ${e.target.variant || 'default'}`);
  };

  return html`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <portland-button @portland-button-click="${handleClick}">
        Click me!
      </portland-button>
      <portland-button 
        variant="secondary" 
        start-icon="fas fa-heart"
        @portland-button-click="${handleClick}"
      >
        Like
      </portland-button>
      <portland-button 
        variant="outline" 
        end-icon="fas fa-share"
        @portland-button-click="${handleClick}"
      >
        Share
      </portland-button>
    </div>
  `;
};
