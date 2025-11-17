'use client';

import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const CardCat = ({
  image,
  title,
  desc,
  path,
}: {
  image?: string;
  title: string;
  desc: string;
  path: string;
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
      _hover={{ transform: 'translateY(-4px)' }}
      className="card-blog"
      h={'100%'}
    >
      <Flex
        flexDir={'column'}
        justify={'space-between'}
        maxW={'445px'}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'sm'}
        p={6}
        overflow={'hidden'}
        h={'100%'}
      >
        <Box>
          <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
            <Image
              width={256}
              height={188}
              src={image || `/blog.jpg`}
              alt={title}
              priority
              quality={70}
              sizes="(max-width: 768px) 100vw, 256px"
              style={{
                width: '100%',
                height: '187px',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Box>
          <Stack>
            <Heading
              as={'h3'}
              className="event-heading"
              color={'gray.700'}
              fontSize={{ base: 'sm', lg: 'md' }}
              fontFamily={'body'}
              _hover={{ color: 'red.400' }}
              css={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Heading>
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
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            )}
          </Stack>
        </Box>
      </Flex>
    </Center>
  );
};
