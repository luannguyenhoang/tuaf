import { Box, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  children: React.ReactNode;
  bg: string;
}

const ItemWrapper = (props: Props) => {
  const { children, bg } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={'gray.200'}
      borderRadius={'xl'}
      bg={bg}
      pos="relative"
      transition={'all ease .4s'}
      _hover={{ transform: 'translateY(-24px)' }}
    >
      {children}
    </Box>
  );
};

export const CardSpecial = ({
  step,
  bg,
  children,
}: {
  step: string;
  bg: string;
  children: ReactNode;
}) => {
  return (
    <ItemWrapper bg={bg}>
      <Box position="relative">
        <Box position="absolute" top="-16px" left="50%" style={{ transform: 'translate(-50%)' }}>
          <Text
            textTransform="uppercase"
            bg={'red.300'}
            px={3}
            py={1}
            color={'white'}
            fontSize="sm"
            fontWeight="600"
            rounded="xl"
          >
            {step}
          </Text>
        </Box>
        <Box>{children}</Box>
      </Box>
    </ItemWrapper>
  );
};
