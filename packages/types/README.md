# @cityofportland/types

Shared TypeScript types for Portland Design System components across all
framework implementations.

## Overview

This package provides centralized type definitions that ensure consistency
across React, Lit, Drupal, and other component implementations. By using shared
types, we guarantee that components have the same API regardless of the
framework.

## Installation

```bash
pnpm add @cityofportland/types
```

## Usage

### Importing All Types

```typescript
import { ButtonProps, HeaderProps } from "@cityofportland/types";
```

### Importing Specific Component Types

```typescript
import { ButtonVariant, ButtonSize } from "@cityofportland/types/button";
import { HeaderProps } from "@cityofportland/types/header";
```

### Using in Component Implementations

#### Lit Component

```typescript
import { ButtonProps, ButtonVariant } from "@cityofportland/types";

@customElement("portland-button")
export class Button extends LitElement implements ButtonProps {
  @property({ type: String }) variant: ButtonVariant = "primary";
  // ... other properties
}
```

#### React Component

```typescript
import { ButtonProps } from "@cityofportland/types";

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "default",
  // ... other props
}) => {
  // component implementation
};
```

#### TypeScript Validation

```typescript
import { BUTTON_VARIANTS, ButtonVariant } from "@cityofportland/types/button";

function isValidVariant(value: string): value is ButtonVariant {
  return BUTTON_VARIANTS.includes(value as ButtonVariant);
}
```

## Available Types

### Button Types

- `ButtonProps` - Core button properties
- `ButtonPropsWithSlots` - Extended props with slot content
- `ButtonVariant` - Available button style variants
- `ButtonSize` - Available button sizes
- `ButtonType` - HTML button type attribute values
- `BUTTON_VARIANTS` - Readonly array of all variants
- `BUTTON_SIZES` - Readonly array of all sizes
- `BUTTON_TYPES` - Readonly array of all types

### Header Types

- `HeaderProps` - Core header properties
- `HeaderPropsWithSlots` - Extended props with slot content
- `HeaderSlots` - Available header slots

### Common Types

- `BaseComponentProps` - Base properties shared by most components
- `DisableableProps` - Props for disableable components
- `ClickableProps` - Props for clickable components
- `LinkableProps` - Props for components that can act as links
- `IconSlotProps` - Props for components with icon slots
- `CommonSize` - Standard size tokens
- `ColorToken` - Design system color tokens
- `SpacingToken` - Spacing scale tokens

## Benefits

### Type Safety

Ensures components have consistent APIs across frameworks and catches errors at
compile time.

### Autocomplete

IDEs provide intelligent autocomplete for component properties.

### Documentation

Types serve as inline documentation for component APIs.

### Refactoring

Centralized types make it easy to update component interfaces across all
implementations.

## Contributing

When adding new components:

1. Create a new type file in `src/` (e.g., `src/card.ts`)
2. Export types in `src/index.ts`
3. Update this README with the new types
4. Run `pnpm build` to generate type declarations

## Development

```bash
# Build type declarations
pnpm build

# Watch mode for development
pnpm build:watch

# Type check
pnpm type-check

# Clean build artifacts
pnpm clean
```

## License

MIT
