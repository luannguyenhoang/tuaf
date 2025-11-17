'use client';

import { toSlug } from '@/utils/toSlug';
import { Box, Button, HStack, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const InputSearch = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [checkInput, setCheckInput] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });
    if (str != '') {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
      onClose();
    }
    setSearchQuery('');
  };

  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    if (searchQuery != '' && str == '') {
      setCheckInput(true);
    } else {
      setCheckInput(false);
    }
  }, [searchQuery]);
  return (
    <Box zIndex={'100'}>
      <form onSubmit={onSearch}>
        <HStack>
          <Input
            required
            bg={'white'}
            value={searchQuery}
            border={'1px solid #BFBFBF '}
            borderRadius={10}
            px={4}
            placeholder="Tìm kiếm..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            color={'#ffffff'}
            size={'2xl'}
            borderRadius={'10px'}
            p={'10px 10px'}
            bg={'linear-gradient(70deg, #f68920 0%, #fc5934 100%);'}
            transition={'ease-in-out .4s'}
            _hover={{
              background: 'linear-gradient(70deg,#fc5934 0%, #f68920  100%);',
              transition: '0.4s ease-in-out',
            }}
            onClick={onSearch}
          >
            Tìm kiếm
          </Button>
        </HStack>
      </form>
      {checkInput && (
        <Box pt={2} display={'flex'} color={'#f5222d'} justifyContent={'center'}>
          <Text>Từ khóa tìm kiếm không hợp lệ</Text>
        </Box>
      )}
    </Box>
  );
};
