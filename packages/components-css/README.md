# @cityofportland/components-css

CSS component styles for the Portland Design System built with Tailwind CSS and
PostCSS.

## Overview

This package provides pre-built, minified CSS for Portland Design System
components. It uses:

- **Tailwind CSS** - Utility-first CSS framework with design token integration
- **Vite** - Fast build tooling for bundling and minification
- **Design Tokens** - Integrated theme from `@cityofportland/design-tokens`

## Installation

```bash
pnpm add @cityofportland/components-css
```

## Usage

### Import Preflight styles to reset user agent

```css
@import "@cityofportland/components-css/preflight";
```

Or in JavaScript/TypeScript:

```javascript
import "@cityofportland/components-css/preflight.css";
```

### Import Individual Components

For better performance, import only the components you need:

```css
@import "@cityofportland/components-css/button";
```

```javascript
import "@cityofportland/components-css/button.css";
```

## Development

### Build workspace dependencies

```bash
pnpm --filter="{.}^..." build
```

### Build CSS

```bash
pnpm build
```

Outputs:

- `dist/preflight.css` - Reset styles
- `dist/button.css` - Individual component styles
- All files are minified with cssnano

### Watch Mode

```bash
pnpm dev
```

Watches for changes and rebuilds automatically.

### Clean Build Directory

```bash
pnpm clean
```

## Architecture

### Build Pipeline

1. **Source CSS** (`src/`) - Component styles using Tailwind `@apply` directives
2. **Vite Build** - Bundles and minifies with Lightning CSS
3. **Output** (`dist/`) - Production-ready CSS files

### Design Token Integration

This package imports the Tailwind theme generated from
`@cityofportland/design-tokens`:

```css
@import "@cityofportland/design-tokens/tailwind/theme.css";
```

All Tailwind utilities reference CSS custom properties from the design tokens,
ensuring consistency across all Portland Design System packages.

## Adding New Components

1. Create a new directory in `src/` (e.g., `src/card/`)
2. Add your component CSS file (e.g., `card.css`)
3. Add boilerplate to create independent CSS:

```css
@layer theme, components, utilities;

@import "@cityofportland/design-tokens/tailwind/theme.css" layer(theme);
@import "tailwindcss/utilities" layer(utilities);
```

4. Wrap your work in `@layer components {...}`
5. Use Tailwind utilities with `@apply`

## License

MIT
