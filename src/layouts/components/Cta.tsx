import { Box, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BtnPhone = dynamic(() => import('@/components/ButtonCTA').then((mod) => mod.BtnPhone));

export const CTA = () => {
  const [page_content, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=cta`, {
          next: { revalidate: 3 },
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        setPageContent(data?.posts[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getPageContent();
  }, []);

  return (
    <Box
      pos={'fixed'}
      bottom={'80px'}
      right={'34px'}
      transform={'translateY(-50%)'}
      className="CTA"
      w={'40px'}
      h={'40px'}
      zIndex={5}
    >
      <VStack gap={0}>
        <BtnPhone label={page_content?.acf?.phone} />
      </VStack>
    </Box>
  );
};
