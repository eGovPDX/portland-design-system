# Portland Component Library - Lit Components

This package contains Web Components built with Lit that mirror the functionality of the React components in the Portland Component Library.

## Features

- 🔥 Built with [Lit](https://lit.dev/) - Fast, lightweight web components
- 📖 Documented with [Storybook](https://storybook.js.org/)
- 🎨 Styled with USWDS design system
- ♿ Accessible by default
- 🎯 Framework agnostic - works with React, Vue, Angular, or vanilla JavaScript

## Installation

```bash
npm install @cityofportland/components-lit
```

## Usage

### In HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="module"
      src="node_modules/@cityofportland/components-lit/dist/portland-components-lit.es.js"
    ></script>
    <link
      rel="stylesheet"
      href="node_modules/@cityofportland/components-lit/dist/style.css"
    />
  </head>
  <body>
    <portland-button variant="secondary">Click me!</portland-button>
  </body>
</html>
```

### In JavaScript/TypeScript

```javascript
import "@cityofportland/components-lit";

// Components are now available as custom elements
document.body.innerHTML = `
  <portland-button variant="primary">Hello World</portland-button>
`;
```

### In React

```jsx
import "@cityofportland/components-lit";

function App() {
  const handleClick = (event) => {
    console.log("Button clicked:", event.detail);
  };

  return (
    <portland-button variant="secondary" onPortlandButtonClick={handleClick}>
      React Integration
    </portland-button>
  );
}
```

### In Vue

```vue
<template>
  <portland-button variant="accent-cool" @portland-button-click="handleClick">
    Vue Integration
  </portland-button>
</template>

<script>
import "@cityofportland/components-lit";

export default {
  methods: {
    handleClick(event) {
      console.log("Button clicked:", event.detail);
    },
  },
};
</script>
```

## Available Components

### Button (`<portland-button>`)

A button component that draws attention to important actions.

#### Properties

- `variant`: `'default' | 'secondary' | 'accent-cool' | 'accent-warm' | 'base' | 'outline' | 'outline-inverse'`
- `size`: `'default' | 'big'`
- `disabled`: `boolean`
- `aria-disabled`: `boolean`
- `unstyled`: `boolean`
- `type`: `'button' | 'submit' | 'reset'`
- `start-icon`: `string` - Icon class name for start icon
- `end-icon`: `string` - Icon class name for end icon

#### Events

- `portland-button-click`: Fired when the button is clicked

#### Example

```html
<portland-button variant="secondary" size="big" start-icon="fas fa-download">
  Download File
</portland-button>
```

## Development

### Prerequisites

- Node.js >= 18
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Storybook
pnpm storybook

# Build for production
pnpm build

# Run tests
pnpm test
```

### Project Structure

```
src/
├── components/
│   └── Button/
│       ├── Button.js          # Component implementation
│       ├── Button.css         # Component styles
│       ├── Button.stories.js  # Storybook stories
│       └── index.js          # Component exports
├── styles/
│   └── index.scss            # Global styles
└── index.js                  # Main entry point
```

## Browser Support

- Chrome/Edge 79+
- Firefox 63+
- Safari 13.1+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and stories
5. Submit a pull request

## License

ISC
