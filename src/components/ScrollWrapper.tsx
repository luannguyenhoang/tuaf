import { Box } from '@chakra-ui/react';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
  inView: boolean;
};

// eslint-disable-next-line no-unused-vars
export const ScrollWrapper = ({ children, inView, ...props }: Props) => {
  return (
    <Box style={{ overflowX: 'hidden' }} {...props}>
      {children}
    </Box>
  );
};
