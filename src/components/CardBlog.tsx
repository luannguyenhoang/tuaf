'use client';

import { clean } from '@/lib/sanitizeHtml';
import { Avatar, AvatarBadge, Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const CardBlog = ({
  image,
  title,
  desc,
  path,
  tag,
  bgTag,
  date,
  imageH,
  preview,
}: {
  image?: string;
  title: string;
  desc: string;
  path: string;
  tag?: string;
  bgTag?: string;
  date?: string;
  imageH?: string;
  preview?: boolean;
}) => {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <Center
      as={Link}
      style={{ textDecoration: 'none' }}
      href={path}
      py={6}
      pos={'relative'}
      transition={'all ease .4s'}
      _hover={{ transform: 'translateY(-6px)' }}
      className="card-blog"
      h={'100%'}
    >
      <Flex
        flexDir={'column'}
        maxW={'445px'}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'sm'}
        overflow={'hidden'}
        h={'100%'}
      >
        <Box>
          {!preview && (
            <Box
              pos="relative"
              w="100%"
              h="-webkit-fit-content" // chiều cao cố định
              aspectRatio={'3 / 2'}
            >
              <Image
                src={image || '/blog.jpeg'}
                alt={title}
                fill
                quality={70}
                style={{
                  objectFit: 'contain',
                  aspectRatio: '3 / 2',
                }}
              />
            </Box>
          )}

          <Stack px={'20px'} pt={'20px'}>
            <Box>
              {tag && (
                <Text
                  fontWeight={600}
                  fontSize={'.8rem'}
                  bg={bgTag || 'green.500'}
                  py={'6px'}
                  px={'12px'}
                  color={'white'}
                  as={'span'}
                  rounded={'md'}
                >
                  {tag}
                </Text>
              )}
            </Box>

            <Heading
              className="event-heading"
              color={'gray.700'}
              fontSize={{ base: 'sm', lg: 'md' }}
              fontFamily={'body'}
              _hover={{ color: 'red.400' }}
              as={'h3'}
              css={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              dangerouslySetInnerHTML={{ __html: clean(title) }}
            />

            {isMounted && (
              <Text
                color={'gray.500'}
                fontSize={'.8rem'}
                css={{
                  display: '-webkit-box',
                  WebkitLineClamp: '4',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                dangerouslySetInnerHTML={{ __html: clean(desc) }}
              />
            )}
          </Stack>
        </Box>

        <Stack m={'20px'} direction={'row'} spacing={4} align={'center'}>
          <Avatar bg={'teal.300'} size={'sm'}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Admin</Text>
            <Text color={'gray.500'}>{date}</Text>
          </Stack>
        </Stack>
      </Flex>
    </Center>
  );
};
