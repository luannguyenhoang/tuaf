'use client';

import { clean } from '@/lib/sanitizeHtml';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const CardBlogVert = ({
  title,
  desc,
  tag,
  image,
  path,
}: {
  title: string;
  desc: string;
  tag: string;
  image?: string;
  path?: string;
}) => {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      rounded={'sm'}
      as={Link}
      href={path ?? '#'}
    >
      <Box flex={1}>
        <Box m={'12px 24px'} rounded={'sm'} overflow={'hidden'}>
          <Image
            width={320}
            height={200}
            src={image || `/blog.jpg`}
            alt={title}
            quality={70}
            sizes="(max-width: 768px) 100vw, 320px"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>

      <Stack flex={1}>
        <CardBody pb={0}>
          <HStack>
            <Tag
              size={'xl'}
              variant="solid"
              colorScheme="red"
              fontSize={'sm'}
              whiteSpace={'nowrap'}
              p="6px"
            >
              {tag}
            </Tag>
            <Heading
              as={'h3'}
              size="sm"
              _hover={{ color: 'red.500' }}
              transition={'all ease .3s'}
              dangerouslySetInnerHTML={{ __html: clean(title) }}
            />
          </HStack>

          {isMounted && (
            <Text
              color={'gray.500'}
              fontSize={'.8rem'}
              dangerouslySetInnerHTML={{ __html: clean(desc) }}
            />
          )}
        </CardBody>

        <CardFooter pt={0}>
          <Button variant="link" colorScheme="red">
            Xem thêm
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
