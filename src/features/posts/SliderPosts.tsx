'use client';

import { Loading } from '@/components/Loading';
import { clean } from '@/lib/sanitizeHtml';
import { formatDate } from '@/utils/date';
import { Container, Grid } from '@chakra-ui/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSize } from '../../hooks/useSizeWindow';

const CardBlog = dynamic(() => import('@/components/CardBlog').then((mod) => mod.CardBlog));

export const StyledContainer = styled(Container)`
  .mySwiper {
    padding-bottom: 38px;
  }
  .swiper-slide {
    height: 550px;
  }
`;

export const SLiderPosts = () => {
  const { size } = useSize();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/?type=notifis&page=${page}`, {
          next: { revalidate: 3 },
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data: { posts: any[] } = await res.json();
        const { posts } = data;
        posts?.length && setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, [page]);

  return (
    <StyledContainer maxW="6xl">
      {!isLoading && (
        <Swiper
          slidesPerView={(size.width < 480 && 1) || (size.width < 992 && 2) || 3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {posts?.map((post: any, index: number) => (
            <SwiperSlide key={index}>
              <CardBlog
                date={post?.date ? formatDate(post.date) : ''}
                key={index}
                title={clean(post?.title?.rendered)}
                tag="Thông báo"
                desc={clean(post.excerpt.rendered)}
                image={post?.featured_image || ''}
                path={`/${post?.slug}`}
              />
            </SwiperSlide>
          ))}
          {posts?.length === 0 && (
            <Grid placeItems={'center'} height={'40vh'}>
              Dữ liệu đang được chúng tôi cập nhập
            </Grid>
          )}
        </Swiper>
      )}

      {isLoading && <Loading />}
    </StyledContainer>
  );
};
