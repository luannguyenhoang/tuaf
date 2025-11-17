'use client';

import { deleteSpace } from '@/utils/deleteSpace';
import { toSlug } from '@/utils/toSlug';
import { Box, Button, Container, HStack, Heading, Input, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ListSearchPosts } from './ListSearchPosts';

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [keyWord, setKeyWord] = useState<any>();
  const [isCorrect, setIsCorrect] = useState(false);

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/tim-kiem?keyword=${keyWord}&page=${selected + 1}`);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });

    if (str != '') {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
    } else {
      setIsCorrect(true);
    }
  };
  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    if (searchQuery != '' && str == '') {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    setKeyWord(keyword || '');
  }, [searchParams]);

  return (
    <>
      <Box
        height={'350px'}
        position={'relative'}
        py="120px"
        display={'flex'}
        flexDirection="column"
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w={'100%'}
          h={'100%'}
          bgColor={'#07294dc0'}
          opacity={0.8}
          zIndex={'1'}
        ></Box>
        <Image
          src={'/truong-dai-hoc-nong-lam-thai-nguyen.jpg'}
          alt="image-alt-text"
          fill
          quality={70}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '0 70%' }}
        />
        <Container maxW={'6xl'} zIndex={2}>
          <Box>
            <Box justifyContent={'center'} pb={5}>
              <form onSubmit={onSearch}>
                <HStack justifyContent={'center'} columnGap={0}>
                  <Input
                    required
                    value={searchQuery}
                    type="Text"
                    border={'1px solid #ffffff '}
                    borderRadius={'15px 0 0 15px'}
                    bgColor={'white'}
                    color={'black'}
                    maxW={'2xl'}
                    size="lg"
                    focusBorderColor="#ffc600"
                    placeholder="Nhập vào từ khóa..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    borderRadius={'0 15px 15px 0'}
                    onClick={onSearch}
                    color={'#ffffff'}
                    size="lg"
                    bg={'linear-gradient(70deg, #f68920 0%, #fc5934 100%);'}
                    transition={'ease-in-out .4s'}
                    _hover={{
                      background: 'linear-gradient(70deg,#fc5934 0%, #f68920  100%);',
                      transition: '0.4s ease-in-out',
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </HStack>
              </form>
            </Box>
            {isCorrect && (
              <Box pt={1} display={'flex'} color={'#f5222d'} justifyContent={'center'}>
                <Text>Từ khóa tìm kiếm không hợp lệ</Text>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxW={'6xl'} py={'70px'}>
        <Box minH={'300px'}>
          {keyWord !== '' && (
            <>
              <Heading
                size={'xl'}
                color={'#07294d'}
                pb={'40px'}
                textAlign={{ base: 'center', lg: 'center' }}
              >
                Kết quả trả về cho từ khóa : {deleteSpace(keyWord)}
              </Heading>
              <ListSearchPosts handleRouter={handleRouter} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};
