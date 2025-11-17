'use client';

import { clean } from '@/lib/sanitizeHtml';
import { Button, Container, HStack, SimpleGrid } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CardBlog = dynamic(() => import('@/components/CardBlog').then((mod) => mod.CardBlog));
const HeadSection = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSection)
);

export const Event = ({ posts }: { posts: any }) => {
  return (
    <Container maxW={'6xl'} py={'64px'}>
      <HeadSection
        title_h2={true}
        title="Tin tức"
        subtitle="news"
        desc="Đừng vội lướt qua những tin tức cập nhật từ chúng tôi"
      />
      <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} gap={'24px'}>
        {/* <CardBlog
          title={"Thư ngỏ hợp tác"}
          desc={
            "Kính gửi Quý Doanh nghiệp.Trước tiên, Trường Đại học Nông Lâm Thái Nguyên xin gửi lời chào trân trọng và lời chúc sức khỏe, thành công đến Quý Doanh nghiệp. Trường Đại học Nông Lâm Thái Nguyên hướng tới mục tiêu trở thành một trong những trường đại học hàng đầu Việt Nam về lĩnh vực nông lâm nghiệp, tài nguyên và môi trường vào năm 2030 và được công nhận trong hệ thống kiểm định chất lượng giáo dục Đông Nam Á (AUN - QA)..."
          }
          image={"/hop-tac.png"}
          path={`/hop-tac`}
        /> */}
        {posts &&
          posts
            ?.slice(0, 3)
            .map((post: any, index: number) => (
              <CardBlog
                key={index}
                image={post?.featured_image || ''}
                title={clean(post?.title?.rendered) || ''}
                desc={clean(post?.excerpt?.rendered) || ''}
                path={`/${post?.slug}`}
              />
            ))}
      </SimpleGrid>

      <HStack justify={'center'}>
        <Button
          as={Link}
          href={'/tin-tuc'}
          colorScheme={'#064121'}
          variant={'link'}
          fontSize={{ base: 'md', md: 'xl' }}
        >
          Xem tất cả
        </Button>
      </HStack>
    </Container>
  );
};
