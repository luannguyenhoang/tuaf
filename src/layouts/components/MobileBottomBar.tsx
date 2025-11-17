'use client';

import { Box, Button, Container, HStack, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsMessenger, BsTelephoneFill } from 'react-icons/bs';

export const MobileBottomBar = () => {
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 },
        });
        if (!res.ok) return;
        const data = await res.json();
        setPageContent(data?.posts?.[0]);
      } catch (_) {
        // noop
      }
    };
    getPageContent();
  }, []);

  const messengerLink = pageContent?.acf?.block_34?.block_4?.link_icon_facebook || '';
  const zaloLink = pageContent?.acf?.block_34?.block_4?.link_icon_zalo || '';
  const phoneNumber = pageContent?.acf?.block_34?.block_4?.link_phone || '0941011771';

  return (
    <Box
      display={{ base: 'block', lg: 'none' }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="green.600"
      py="12px"
      zIndex={20}
      boxShadow="md"
    >
      <Container maxW="6xl">
        <HStack spacing="8px">
          <Button
            as={Link}
            prefetch={false}
            href={messengerLink}
            leftIcon={<Icon as={BsMessenger} />}
            colorScheme="green"
            flex={1}
            size="sm"
            rounded="full"
          >
            Messenger
          </Button>
          <Button
            as={Link}
            prefetch={false}
            href={zaloLink}
            colorScheme="green"
            bg="green.500"
            flex={1}
            size="sm"
            rounded="full"
          >
            Zalo
          </Button>
          <Button
            as={Link}
            prefetch={false}
            href={`tel:${phoneNumber}`}
            leftIcon={<Icon as={BsTelephoneFill} />}
            colorScheme="green"
            bg="green.500"
            flex={1}
            size="sm"
            rounded="full"
          >
            {phoneNumber}
          </Button>
        </HStack>
      </Container>
    </Box>
  );
};
