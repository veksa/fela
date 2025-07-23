# @veksa/fela

[![npm version](https://img.shields.io/npm/v/@veksa/fela.svg?style=flat-square)](https://www.npmjs.com/package/@veksa/fela)
[![npm downloads](https://img.shields.io/npm/dm/@veksa/fela.svg?style=flat-square)](https://www.npmjs.com/package/@veksa/fela)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE.md)

A wrapper around Fela for React components with TypeScript support, providing enhanced styling capabilities with reusable rules, theme support, and performance optimizations.

## Installation

@veksa/fela requires **TypeScript 5.8 or later**.

### Using npm or yarn

```bash
# npm
npm install @veksa/fela

# yarn
yarn add @veksa/fela
```

## Features

- **TypeScript Support**: Full TypeScript integration for better developer experience
- **Reusable Style Rules**: Create reusable style rules with `createRules`
- **React Hooks**: Easy integration with React components using `useStyle`
- **Theme Support**: Access theme variables in your styles
- **Style Extension**: Extend styles through props
- **Performance Optimizations**: Built-in caching for better performance

## Basic Usage

### Setting up the Fela Provider

```tsx
import React from 'react';
import { createRenderer } from 'fela';
import { RendererProvider, ThemeProvider } from 'react-fela';
import { FelaRendererContext } from '@veksa/fela';

const renderer = createRenderer();
const theme = { primaryColor: '#007bff', secondaryColor: '#6c757d' };

const App = () => (
  <ThemeProvider theme={theme}>
    <FelaRendererContext.Provider value={renderer}>
      <YourComponent />
    </FelaRendererContext.Provider>
  </ThemeProvider>
);
```

### Creating Style Rules

```tsx
import { createRules, IRuleFn } from '@veksa/fela';
import { IStyle } from 'fela';

// Define your props interface
interface ButtonProps {
  primary?: boolean;
  disabled?: boolean;
}

// Define your theme interface
interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

// Create style rules
const buttonRules: IRuleFn<{
  root: IStyle;
  label: IStyle;
}, ButtonProps, Theme, IStyle> = (props, renderer) => {
  const { primary, disabled, theme } = props;
  
  return {
    root: {
      padding: '10px 15px',
      borderRadius: '4px',
      backgroundColor: primary ? theme.primaryColor : theme.secondaryColor,
      color: '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      transition: 'all 0.3s ease',
      '&:hover': {
        opacity: disabled ? 0.7 : 0.9,
      },
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
  };
};

// Create the reusable style
export const useButtonStyle = createRules(buttonRules);
```

### Using the Style in Components

```tsx
import React from 'react';
import { useStyle } from '@veksa/fela';
import { useButtonStyle } from './buttonStyles';

interface ButtonProps {
  primary?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ primary, disabled, children, onClick }) => {
  // Apply the styles
  const { css } = useStyle(useButtonStyle, { primary, disabled });
  
  return (
    <button className={css.root} onClick={onClick} disabled={disabled}>
      <span className={css.label}>{children}</span>
    </button>
  );
};

export default Button;
```

### Extending Styles

```tsx
import React from 'react';
import { useStyle, IExtendProp } from '@veksa/fela';
import { useButtonStyle } from './buttonStyles';

interface CustomButtonProps extends IExtendProp<typeof useButtonStyle> {
  primary?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ primary, disabled, children, onClick, extend }) => {
  // Apply the styles with extensions
  const { css } = useStyle(useButtonStyle, { 
    primary, 
    disabled,
    extend: {
      // Extend the root style
      root: {
        name: 'customButton',
        rule: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }
      },
      // You can extend other rules as well
      ...extend
    }
  });
  
  return (
    <button className={css.root} onClick={onClick} disabled={disabled}>
      <span className={css.label}>{children}</span>
    </button>
  );
};

export default CustomButton;
```

## Contributing

This project welcomes contributions and suggestions.

## License

[MIT](LICENSE.md)
