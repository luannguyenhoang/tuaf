'use client';

import { Loading } from '@/components/Loading';
import { clean } from '@/lib/sanitizeHtml';
import { formatDate } from '@/utils/date';
import { Box, Center, Container, GridItem, SimpleGrid } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CardBlog = dynamic(() => import('@/components/CardBlog').then((mod) => mod.CardBlog));
const HeadSection = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSection)
);

export const DraftPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts-draft/?len=${9}`);
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts } = data;
        posts?.length && setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, []);

  if (isLoading) return <Loading he="50vh" />;

  if (posts?.length === 0)
    return (
      <Container maxW={'6xl'} py={{ base: '32px', md: '48px' }}>
        <Center minH={'50vh'}>Không có bài viết nào mới xuất bản</Center>
      </Container>
    );

  return (
    <Box>
      <Container maxW={'6xl'} py={{ base: '32px', md: '48px' }}>
        <HeadSection
          title="Danh sách bài viết chưa xuất bản"
          subtitle="bài viết mới"
          desc="Danh sách bài viết chưa xuất bản gần đây"
        />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: '16px', md: '24px' }}>
          {posts?.map((post, index) => (
            <GridItem key={index}>
              <CardBlog
                date={post?.date ? formatDate(post.date) : ''}
                key={index}
                title={clean(post?.title?.rendered)}
                desc={clean(post.excerpt.rendered)}
                image={post?.featured_image || ''}
                path={`/preview/${post?.id}`}
                preview
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
