'use client';

import { Icon, IconButton, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { BsLink45Deg } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { ImFacebook } from 'react-icons/im';

export const Share = ({ url }: { url?: string }) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${domain}/${url}`);
      alert('Link đã được sao chép!');
    } catch (err) {
      alert('Không thể sao chép link, hãy thử lại.');
    }
  };

  return (
    <Stack spacing={'8px'} flexDir={{ base: 'row', xl: 'column' }} pos={'sticky'} top={'120px'}>
      <IconButton
        prefetch={false}
        icon={<Icon as={ImFacebook} w={'18px'} h={'18px'} />}
        as={Link}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          `${domain}/${url}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="facebook"
        rounded={'full'}
        p={'16px'}
        variant={'outline'}
        w={'35px'}
      />
      <IconButton
        prefetch={false}
        icon={<Icon as={FiMail} w={'18px'} h={'18px'} />}
        as={Link}
        href={`mailto:?subject=${encodeURIComponent(
          'Bài viết trang Evstep'
        )}&body=${encodeURIComponent(`Xem bài viết tại: ${domain}/${url}`)}`}
        aria-label="email"
        rounded={'full'}
        p={'16px'}
        variant={'outline'}
        w={'35px'}
      />
      <IconButton
        icon={<Icon as={BsLink45Deg} w={'18px'} h={'18px'} />}
        aria-label="link"
        rounded={'full'}
        variant={'outline'}
        p={'16px'}
        w={'35px'}
        onClick={handleCopyLink}
      />
    </Stack>
  );
};
