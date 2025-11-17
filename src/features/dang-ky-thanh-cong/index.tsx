'use client';

import { Box, Center, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

export const DangkyTc = () => {
  return (
    <Box bg={'linear-gradient(180deg, rgba(255, 255, 255, 1), #dbfed6 100%)'}>
      <Center flexDir={'column'} minH={'50vh'}>
        <Heading size={'md'} color="red.500" pb={'24px'}>
          Đăng ký thành công!
        </Heading>
        <Image
          priority
          src={'/success-icon.png'}
          width={100}
          height={100}
          alt="Thành công"
          quality={70}
          sizes="100px"
        />
        <Text fontSize={'18px'} fontWeight={600} color={'green.700'} pt={'16px'}>
          Cán bộ tư vấn tuyển sinh sẽ liên hệ hỗ trợ tư vấn cho bạn ngay nhé!
        </Text>
      </Center>
    </Box>
  );
};
