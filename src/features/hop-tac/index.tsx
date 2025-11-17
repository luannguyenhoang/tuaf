'use client';

import { clean } from '@/lib/sanitizeHtml';
import { Box, Container, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledBox = styled(Box)`
  ul {
    padding-left: 25px;
  }
`;

export const Hoptac = ({ content }: { content?: any }) => {
  return (
    <Box>
      <Box bg="radial-gradient(circle, rgb(5 89 8) 2%, rgb(98 245 124) 100%, rgba(252,89,52,1) 100%)">
        <Container maxW={'6xl'} py="60px">
          <Heading as="h1" textAlign={'center'} size={'lg'} pb="16px" color={'white'}>
            {content?.title?.rendered || 'THƯ NGỎ HỢP TÁC'}
          </Heading>
        </Container>
      </Box>
      <Container maxW={'6xl'} py="60px">
        <StyledBox
          dangerouslySetInnerHTML={{
            __html: clean(content?.content?.rendered),
          }}
        />
      </Container>
    </Box>
  );
};
