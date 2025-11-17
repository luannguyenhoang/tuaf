'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import { ReactNode, useEffect } from 'react';

interface ChakraProviderWrapperProps {
  children: ReactNode;
}

export default function ChakraProviderWrapper({ children }: ChakraProviderWrapperProps) {
  // Suppress Chakra UI aria-hidden warning globally
  useEffect(() => {
    const originalError = console.error;
    const errorHandler = (...args: any[]) => {
      // Convert all arguments to string for pattern matching
      const errorString = args
        .map((arg) => {
          if (typeof arg === 'string') return arg;
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(' ');

      // Check if this is the aria-hidden warning we want to suppress
      const isAriaHiddenWarning =
        errorString.includes('aria-hidden') &&
        (errorString.includes('not contained inside') || errorString.includes('Doing nothing'));

      if (isAriaHiddenWarning) {
        return; // Suppress this specific Chakra UI warning
      }

      originalError.apply(console, args);
    };

    console.error = errorHandler;

    return () => {
      console.error = originalError;
    };
  }, []);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
