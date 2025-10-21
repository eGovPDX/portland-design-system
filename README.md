# Portland Design System

[Visit Storybook](https://egovpdx.github.io/portland-component-library)

A multi-framework design system monorepo providing shared design tokens and components for React, Web Components (Lit), and Drupal Single Directory Components (SDC). Built on the USWDS design system with tokens managed in Figma via Zeroheight.

## Architecture

This monorepo is organized into framework-specific packages, all sharing a common source of truth for design tokens:

### Packages

- **`packages/design-tokens/`** - Design tokens managed via Zeroheight/Figma, exported as CSS variables, JSON, SCSS, and UnoCSS
- **`packages/components-react/`** - React components with Storybook (tree-shakeable exports, themeable)
- **`packages/components-lit/`** - Web Components using Lit framework (ESM/CJS, custom elements, shadow DOM)
- **`packages/components-drupal/`** - Drupal Single Directory Components (SDC) for Drupal 10.2+ with Twig templates
- **`sites/design.portland.gov/`** - Astro-powered documentation site

### Token Flow

```
Figma (Zeroheight)
    ↓ (auto-sync)
GitHub: zeroheight-incoming/
    ↓ (GitHub Actions)
Style Dictionary: design_tokens.css + outputs
    ↓
All component frameworks consume via @cityofportland/design-tokens
    ↓
React | Lit | Drupal components use tokens
    ↓
Storybook stories showcase all variants
```

## Usage

### React Components

Install the library in your project:

```bash
pnpm add @cityofportland/components-react
```

### Component-Level Imports (Recommended)

This approach provides optimal tree shaking by allowing you to import only the components and styles you need, resulting in the smallest possible bundle size.

1.  **Import the component:**

    ```jsx
    import { Button } from "@cityofportland/components-react/components/Button";
    ```

2.  **Import the component's stylesheet:**

    ```jsx
    import "@cityofportland/components-react/components/Button/style.css";
    ```

### Web Components (Lit)

For use in vanilla JavaScript, Vue, or other frameworks supporting web components:

```bash
pnpm add @cityofportland/components-lit
```

```html
<script type="module">
  import "@cityofportland/components-lit/button/index.js";
</script>

<portland-button variant="primary" size="default"> Click me </portland-button>
```

### Drupal Single Directory Components

For Drupal 10.2+ projects, SDC components are available in `packages/components-drupal/`:

```twig
{% include 'components-drupal/button' with {
  variant: 'primary',
  label: 'Submit Form',
  type: 'submit',
} %}
```

### React Component-Level Imports (Recommended)

This approach provides optimal tree shaking by allowing you to import only the components and styles you need, resulting in the smallest possible bundle size.

### React Theme Loading

You can import a specific theme to style your application. Choose one of the following:

```jsx
// PGOV Theme (Default)
import "@cityofportland/components-react/themes/pgov.css";

// PGOV Dark Theme
import "@cityofportland/components-react/themes/pgov-dark.css";

// USWDS Default Theme
import "@cityofportland/components-react/themes/uswds-default.css";
```

### React Design Tokens

You can import the design tokens as a JavaScript object to use in your own custom components and styling.

```jsx
import { designTokens } from "@cityofportland/components-react/tokens";

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

### React Dynamic Theme Loading

For applications that need to switch themes on the fly (e.g., a light/dark mode toggle), you can use the `themeLoader`.

```jsx
import { loadTheme } from "@cityofportland/components-react/themeLoader";

const ThemeToggleButton = ({ theme, setTheme }) => {
  const toggleTheme = async () => {
    const newTheme = theme === "pgov" ? "pgov-dark" : "pgov";
    await loadTheme(newTheme);
    setTheme(newTheme);
  };

  return <button onClick={toggleTheme}>Toggle Theme</button>;
};
```

### Design Tokens Package

All frameworks consume from the shared tokens package:

```bash
pnpm add @cityofportland/design-tokens
```

**CSS (Default)**:

```css
@import "@cityofportland/design-tokens/css/design_tokens.css";
```

**JSON**:

```js
import tokens from "@cityofportland/design-tokens/js/design_tokens.json";
```

**UnoCSS Theme** (for Lit components):

```ts
import unocssTheme from "@cityofportland/design-tokens/unocss/theme.js";
```

## Development

### Quick Start

```bash
# Clone the repository
git clone https://github.com/eGovPDX/portland-design-system.git
cd portland-design-system

# Install dependencies (using pnpm)
pnpm install

# Start all Storybooks
pnpm run storybook
```

Storybooks will open in your browser:

- **React**: [http://localhost:6006](http://localhost:6006)
- **Lit**: [http://localhost:6007](http://localhost:6007)
- **Drupal**: [http://localhost:6008](http://localhost:6008)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

To install pnpm:

```bash
npm install -g pnpm
```

## Available Scripts

**From root directory** (pnpm workspace):

- `pnpm run storybook` - Start all Storybooks
- `pnpm run build` - Build all packages
- `pnpm run lint` - Lint all packages

**Per package**:

```bash
# React components
cd packages/components-react
pnpm run storybook  # Start React Storybook
pnpm run build      # Build React components
pnpm run test       # Run Jest tests

# Lit components
cd packages/components-lit
pnpm run storybook  # Start Lit Storybook
pnpm run build      # Build Lit components
pnpm run test:watch # Run Vitest in watch mode

# Drupal components
cd packages/components-drupal
pnpm run storybook  # Start Drupal Storybook
pnpm run build      # Build Drupal SDC components
pnpm run lint       # Lint Drupal files

# Design tokens
cd packages/design-tokens
pnpm run build      # Process tokens from Zeroheight
```

## Project Structure

```
portland-design-system/
├── packages/
│   ├── design-tokens/           # Shared design tokens (CSS, JSON, SCSS, UnoCSS)
│   ├── components-react/        # React components with Storybook
│   │   └── src/components/      # All component implementations
│   ├── components-lit/          # Web Components (Lit framework)
│   │   └── src/                 # Lit component implementations
│   ├── components-drupal/       # Drupal Single Directory Components
│   │   └── src/                 # Drupal SDC components with Twig/YAML
│   └── components-css/          # Base CSS utilities
├── sites/
│   └── design.portland.gov/     # Astro documentation site
├── .github/
│   ├── workflows/               # GitHub Actions for token processing
│   └── copilot-instructions.md  # Architecture documentation
├── pnpm-workspace.yaml          # Workspace configuration
└── README.md                    # This file
```

### Component Packages Structure

Each component framework follows a consistent structure:

**React** (`packages/components-react/src/components/Button/`):

```
Button/
├── Button.jsx           # React component
├── Button.css           # Component styles
├── Button.stories.jsx   # Storybook stories
├── Button.test.jsx      # Jest tests
└── index.js             # Exports
```

**Lit** (`packages/components-lit/src/button/`):

```
button/
├── button.ts            # Lit web component
├── button.css.ts        # Component styles
├── button.stories.ts    # Storybook stories
└── index.ts             # Exports
```

**Drupal SDC** (`packages/components-drupal/src/button/`):

```
button/
├── button.component.yml # SDC metadata & schema
├── button.twig          # Twig template
├── button.css           # Component styles
├── button.js            # Drupal behaviors
└── button.mjs           # Module wrapper (optional)
```

### Monorepo Organization

- **Root workspace** manages dependencies via pnpm workspaces
- **Packages** use `workspace:*` protocol for cross-package dependencies
- **Design tokens** are auto-synced from Zeroheight → GitHub → Style Dictionary → all packages
- **Each package** has its own build process (Vite, tsup, etc.)

## Components

### Available in All Frameworks (React, Lit, Drupal)

### Navigation Components

- **Banner** - Official government website banner
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
- **ProcessSteps** - Process step indicators
- **StepIndicator** - Horizontal step indicator for multi-step processes
- **Tooltip** - Tooltip component
- **PopoverWithCard** - Popover for displaying interactive Card content
- **Table** - Table component for displaying tabular data with sorting, striping, sticky headers, scrollable and stacked (responsive) layouts.

### Design System Components

- **ColorSwatch** - Color display and documentation
- **Spacing** - Spacing utilities and documentation

## Documentation

Full documentation and interactive examples are available in Storybook for each framework:

- **React Storybook**: [http://localhost:6006](http://localhost:6006) - `pnpm run storybook` from `packages/components-react/`
- **Lit Storybook**: [http://localhost:6007](http://localhost:6007) - `pnpm run storybook` from `packages/components-lit/`
- **Drupal Storybook**: [http://localhost:6008](http://localhost:6008) - `pnpm run storybook` from `packages/components-drupal/`

Each Storybook includes:

- Component stories with multiple variants and states
- Interactive controls for testing props
- Accessibility audits (a11y addon)
- Documentation pages with usage examples

## Design System & Tokens

### Token Management

Design tokens are the single source of truth for all component frameworks:

- **Source**: Figma (managed via Zeroheight)
- **Sync**: Automatic via GitHub Actions when tokens are published
- **Processing**: Style Dictionary transforms tokens into multiple formats
- **Outputs**: CSS variables, JSON, SCSS, UnoCSS theme config
- **Package**: `@cityofportland/design-tokens` (workspace dependency)

### Token Categories

- **Colors**: Primary, secondary, accent, base, status (success, warning, error, info)
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Spacing**: 4px-based scale (xs, sm, md, lg, xl, 2xl)
- **Borders**: Radius, width, colors
- **Shadows**: Elevation levels
- **Transitions**: Timing, easing functions

### Using Tokens in Your Components

**React**:

```js
import "@cityofportland/design-tokens/css/design_tokens.css";
// Use: var(--color-primary-medium), var(--spacing-md), etc.
```

**Lit** (UnoCSS):

```ts
import unocssTheme from "@cityofportland/design-tokens/unocss/theme.js";
// Use: bg-primary-medium, px-md, etc.
```

**Drupal** (CSS variables):

```twig
{{ 'var(--color-primary-medium)' }}
```

### Theme Support

All components support multiple themes:

- **PGOV** (Portland.gov default) - Professional, accessible
- **PGOV Dark** - High-contrast dark mode
- **USWDS Default** - U.S. Web Design System baseline

Themes automatically update based on `prefers-color-scheme` media query or manual selection.

## Design System Architecture

### Framework Integration

**React**: Vite library build with Rollup, tree-shakeable exports, CSS module support

- Each component is independently importable
- Styles can be imported separately for optimal bundling
- Full theme support via CSS variables

**Lit/Web Components**: tsup (esbuild) compilation to ESM and CJS, custom element registration

- Standard web component API (can be used in any framework)
- Shadow DOM encapsulation for style isolation
- UnoCSS for utility-first styling

**Drupal SDC**: Vite build with custom Drupal plugin transforms, Twig rendering

- Drupal 10.2+ compatible Single Directory Components
- Standard `.component.yml` schema for component definition
- Integrates with Drupal's form system and AJAX

### Development Best Practices

1. **Design tokens first**: Define tokens before building components
2. **Cross-framework testing**: Ensure components work in all frameworks
3. **Accessibility**: Built-in ARIA labels, keyboard support, contrast requirements
4. **Storybook stories**: Multiple variants and edge cases documented
5. **Responsive design**: Mobile-first, tested at breakpoints
6. **Theme support**: Test in light and dark modes

## Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/component-name`)
3. Make your changes in the appropriate package(s)
4. Follow existing code style and patterns
5. Add/update Storybook stories for your component
6. Run tests and linting
7. Submit a pull request

### Code Style

- **JavaScript/TypeScript**: ESLint + Prettier
- **CSS**: Design tokens preferred, consistent naming
- **Commits**: Clear, descriptive messages

### Before Submitting a PR

- [ ] Tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Storybook stories document all variants
- [ ] Accessibility tested (keyboard navigation, screen readers)
- [ ] Works across all frameworks (React, Lit, Drupal)
- [ ] Documentation updated

### Adding a New Component

1. **Create in React first**:

   ```bash
   mkdir packages/components-react/src/components/MyComponent
   # Add: MyComponent.jsx, MyComponent.stories.jsx, MyComponent.css, index.js
   ```

2. **Create Web Component (Lit)**:

   ```bash
   mkdir packages/components-lit/src/my-component
   # Add: my-component.ts, my-component.stories.ts
   ```

3. **Create Drupal SDC**:

   ```bash
   mkdir packages/components-drupal/src/my-component
   # Add: my-component.component.yml, my-component.twig, my-component.css, my-component.js
   ```

4. **Use design tokens** in all implementations

5. **Document in Storybook** with examples and controls

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed architecture guidance.

## Troubleshooting

### Common Issues

**Design tokens not updating?**

- Tokens are auto-synced from Zeroheight
- Check `.github/workflows/process-zeroheight-tokens.yml` for sync status
- Manual build: `cd packages/design-tokens && pnpm run build`

**Component not showing in Storybook?**

- Ensure story file follows naming: `*.stories.jsx` or `*.stories.ts`
- Check story export matches component name
- Verify Storybook config includes the file pattern

**Cross-framework import issues?**

- Use workspace protocol: `@cityofportland/components-react` (not relative paths)
- Check `pnpm-workspace.yaml` for package inclusion
- Run `pnpm install` after adding new workspace packages

## Resources

- **Design System Docs**: See Storybook documentation for each framework
- **USWDS**: [https://designsystem.digital.gov/](https://designsystem.digital.gov/)
- **Design Tokens Repo**: [github.com/eGovPDX/design-tokens](https://github.com/eGovPDX/design-tokens)
- **Zeroheight**: Design token management platform
- **Figma**: [PGOV Design System](https://www.figma.com/file/tIoZZeEbUXEbSeYUuQ7Nnr/PGOV-Design-System)

## License

ISC License - See [LICENSE](LICENSE) for details.
