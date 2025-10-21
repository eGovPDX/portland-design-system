# Portland Component Library

[Visit Storybook](https://egovpdx.github.io/portland-component-library)

A React component library for Portland.gov, built with design tokens from Figma and based on the USWDS design system.

## Usage

Install the library in your project:

```bash
pnpm add @cityofportland/component-library
```

### Component-Level Imports (Recommended)

This approach provides optimal tree shaking by allowing you to import only the components and styles you need, resulting in the smallest possible bundle size.

1.  **Import the component:**

    ```jsx
    import { Button } from "@cityofportland/component-library/components/Button";
    ```

2.  **Import the component's stylesheet:**

    ```jsx
    import "@cityofportland/component-library/components/Button/style.css";
    ```

### Selective Theme Loading

You can import a specific theme to style your application. Choose one of the following:

```jsx
// PGOV Theme (Default)
import "@cityofportland/component-library/themes/pgov";

// PGOV Dark Theme
import "@cityofportland/component-library/themes/pgov-dark";

// USWDS Default Theme
import "@cityofportland/component-library/themes/uswds-default";
```

### Using Design Tokens

You can import the design tokens as a JavaScript object to use in your own custom components and styling.

```jsx
import { designTokens } from "@cityofportland/component-library/tokens";

const MyCustomComponent = () => (
  <div
    style={{
      backgroundColor: designTokens.color.primary.medium,
      padding: designTokens.spacing.md,
    }}
  >
    Hello, World!
  </div>
);
```

### Dynamic Theme Loading

For applications that need to switch themes on the fly (e.g., a light/dark mode toggle), you can use the `themeLoader`.

```jsx
import { loadTheme } from "@cityofportland/component-library/themeLoader";

const ThemeToggleButton = ({ theme, setTheme }) => {
  const toggleTheme = async () => {
    const newTheme = theme === "pgov" ? "pgov-dark" : "pgov";
    await loadTheme(newTheme);
    setTheme(newTheme);
  };

  return <button onClick={toggleTheme}>Toggle Theme</button>;
};
```

## Contributing to the Library

### Quick Start

```bash
# Clone the repository
git clone https://github.com/eGovPDX/portland-design-system.git
cd portland-component-library

# Install dependencies (using pnpm)
pnpm install

# Start Storybook
pnpm run storybook
```

Storybook will open in your default browser at [http://localhost:6006](http://localhost:6006)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

To install pnpm:

```bash
npm install -g pnpm
```

## Available Scripts

- `pnpm run storybook` - Start Storybook development server
- `pnpm run build` - Build the component library
- `pnpm run build-storybook` - Build Storybook for production
- `pnpm test` - Run tests
- `pnpm run lint` - Run ESLint
- `pnpm run prepare` - Build the library (runs automatically on install)

## Project Structure

```
portland-component-library/
├── src/
│   ├── components/     # React components
│   │   ├── Accordion/  # Accordion content sections
│   │   ├── Alert/      # Alert messages and notifications
│   │   ├── Banner/     # Government website banner
│   │   ├── Breadcrumbs/# Navigation breadcrumbs
│   │   ├── Button/     # Button components
│   │   ├── ColorSwatch/# Color display and documentation
│   │   ├── Contacts/   # Contact information display
│   │   ├── Footer/     # Site footer with accessibility information
│   │   ├── Header/     # Generic USWDS Header wrapper with optional extended layout
│   │   ├── HeroGlobal/ # Global hero section with image and call-to-action
│   │   ├── HeroHomepage/# Homepage hero section
│   │   ├── Identifier/ # Agency identifier component
│   │   ├── LanguageSelector/ # Language selection dropdown component
│   │   ├── Modal/      # Modal dialog component
│   │   ├── PageTemplate/# Page template
│   │   ├── Pagination/ # USWDS-compliant pagination component
│   │   ├── Person/     # Profile block for individuals with avatar, name, role, and contact info
│   │   ├── PGOVHeader/ # Portland.gov navigation header
│   │   ├── ProcessSteps/# Process step indicators
│   │   ├── Search/     # Search input component
│   │   ├── SideNav/    # Side navigation
│   │   ├── SkipNav/    # Keyboard accessibility
│   │   ├── Spacing/    # Spacing utilities
│   │   ├── StepIndicator/# Horizontal step indicator
│   │   ├── SummaryBox/ # Summary information display
│   │   ├── Tag/        # Tag component for labeling and categorization
│   │   ├── Table/      # Table component for displaying tabular data
│   │   ├── Tooltip/    # Tooltip component
│   │   ├── Typography/ # Text components and styles
│   │   ├── Card/       # Card component for displaying content in a styled container
│   │   ├── CardFlag/   # Card component with media and content layout
│   │   ├── CardGrid/   # Grid layout for Card components
│   │   ├── Dropdown/   # Accessible custom dropdown/select component
│   │   ├── ExternalLinkIcon.jsx # External link icon component
│   │   ├── PopoverWithCard/# Popover for displaying interactive Card content
│   │   ├── RadioButtons/ # Accessible radio button component with multiple variants
│   │   ├── TextArea/   # Text area component for multi-line text input
│   │   ├── TextInput/  # Text input component with validation and states
│   │   └── Checkbox/   # Checkbox component allowing multiple selections from a list
│   ├── images/         # Image assets
│   └── styles/         # SCSS styles and themes
├── .storybook/         # Storybook configuration
├── __mocks__/         # Jest mocks
└── dist/              # Built component library
```

## Components

The library includes a comprehensive set of components for building Portland.gov pages:

### Navigation Components

- **Banner** - Official government website banner
- **Header** - Generic USWDS Header wrapper with optional extended layout and navigation slots
- **PGOVHeader** - Portland.gov navigation component based on USWDS Header
- **Footer** - Site footer with accessibility information
- **Identifier** - Agency identifier component displaying parent agency and required policy links
- **SkipNav** - Keyboard accessibility enhancement
- **SideNav** - Side navigation component
- **Breadcrumbs** - Navigation breadcrumbs component
- **Pagination** - USWDS-compliant pagination for navigating paginated content

### Interactive Components

- **Accordion** - Expandable content sections with multiple variants
- **Button** - Button components
- **ButtonGroup** - Group of related buttons, with default and segmented variants
- **Dropdown** - Accessible custom dropdown/select component
- **Modal** - Accessible modal dialog component
- **Tag** - Tag component for labeling and categorization

### Layout Components

- **PageTemplate** - Complete page template with Banner, PGOVHeader, Footer, and SkipNav
- **HeroGlobal** - Global hero section with image and call-to-action
- **HeroHomepage** - Homepage hero section with search and popular links
- **SummaryBox** - Summary information display
- **Card** - Card component for displaying content
- **CardFlag** - Card component with media and content layout
- **CardGrid** - Grid layout for Card components

### Form Components

- **Search** - Search input component with variants
- **TextArea** - Text area component for multi-line text input
- **TextInput** - Text input component with validation and states
- **RadioButtons** - Accessible radio button component with multiple variants
- **Checkbox** - Checkbox component allowing users to select one or more options from a list
- **LanguageSelector** - Language selection dropdown for switching site language, with accessibility and theme support

### Content Components

- **Typography** - Text components and styles
- **Alert** - Alert messages and notifications
- **Contacts** - Contact information display
- **Person** - Profile block for individuals with avatar, name, role, department, contact actions, meta, and tags
- **ProcessSteps** - Process step indicators
- **StepIndicator** - Horizontal step indicator for multi-step processes
- **Tooltip** - Tooltip component
- **PopoverWithCard** - Popover for displaying interactive Card content
- **Table** - Table component for displaying tabular data with sorting, striping, sticky headers, scrollable and stacked (responsive) layouts.

### Design System Components

- **ColorSwatch** - Color display and documentation
- **Spacing** - Spacing utilities and documentation

## Documentation

Full documentation is available in Storybook:

1. Start Storybook with `pnpm run storybook`
2. Open [http://localhost:6006](http://localhost:6006)
3. Browse components in the sidebar

Key documentation sections:

- Introduction - Overview and getting started
- Components - Detailed documentation for each component
- Design Tokens - Typography, colors, and spacing
- Theme Support - Light and dark mode support
- Color System - Comprehensive color palettes

## Design System

This component library uses the PGOV theme based on the Portland.gov design system, with design tokens managed in a separate project at [github.com/eGovPDX/design-tokens](https://github.com/eGovPDX/design-tokens).

Features:

- Built on USWDS (U.S. Web Design System)
- Accessible by default
- Responsive design
- Dark mode support
- Comprehensive design tokens

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your changes:

- Follow the existing code style
- Include appropriate tests
- Update documentation as needed
- Pass all CI checks

## License

ISC License - See [LICENSE](LICENSE) for details.
