'use client';

import { clean } from '@/lib/sanitizeHtml';
import { Box, Container, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledBox = styled(Box)`
  ul {
    padding-left: 25px;
  }
`;

export const About = ({ content }: { content?: any }) => {
  return (
    <Box>
      <Box bg="radial-gradient(circle, rgb(5 89 8) 2%, rgb(98 245 124) 100%, rgba(252,89,52,1) 100%)">
        <Container maxW={'6xl'} py="60px">
          <Heading as="h1" textAlign={'center'} size={'lg'} pb="16px" color={'white'}>
            {content?.title?.rendered || 'Giới thiệu Trường Đại học Nông lâm Thái nguyên'}
          </Heading>
        </Container>
      </Box>

      <Container maxW={'6xl'} py="60px">
        <Heading as="h2" textAlign={'center'} size={'lg'} pb="16px">
          Chào mừng các bạn đến với Trường Đại học Nông Lâm Thái Nguyên
        </Heading>
        <StyledBox
          dangerouslySetInnerHTML={{
            __html: clean(
              content?.content?.rendered ||
                '<h2>Chào mừng các bạn đến với Trường Đại học Nông Lâm Thái Nguyên</h2>\n<p><b>Trường Đại học Nông Lâm Thái Nguyên</b>'
            ),
          }}
        />
      </Container>
    </Box>
  );
};
