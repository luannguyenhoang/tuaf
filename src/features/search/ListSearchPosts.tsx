'use client';

import { CardBlog } from '@/components/CardBlog';
import { Loading } from '@/components/Loading';
import { clean } from '@/lib/sanitizeHtml';
import { TypePost } from '@/types/types';
import { formatDate } from '@/utils/date';
import { toSlug } from '@/utils/toSlug';
import { Box, Center, Grid, GridItem, HStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export const StyledPaginate = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0 0.5rem;

  li a {
    border-radius: 7px;
    padding: 0rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
    margin-right: 4px;
    margin-left: 4px;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export const ListSearchPosts = ({
  handleRouter,
}: {
  handleRouter?: ({
    // eslint-disable-next-line no-unused-vars
    selected,
    // eslint-disable-next-line no-unused-vars
    searchText,
  }: {
    selected: number;
    searchText: string;
  }) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<TypePost[]>([]);
  const [totalPosts, setTotalPosts] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  const [resetpagi, setResetpagi] = useState(false);
  const len = Math.ceil(Number(totalPosts) / 9);

  const page = searchParams.get('page');
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    setResetpagi(true);
  }, [page]);

  useEffect(() => {
    let keywords = keyword || '';
    var pages = Number(page || '1');
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search/?page=${pages}&search=${toSlug({
            type: 'signed',
            input: keywords,
          })}`,
          {
            next: { revalidate: 3 },
          }
        );

        const data: { posts: TypePost[]; totalPosts: string } = await res.json();
        const { posts, totalPosts } = data;
        totalPosts && setTotalPosts(totalPosts);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      setResetpagi(false);
    };
    getPosts();
  }, [keyword, page]);

  return (
    <>
      <Box>
        {!isLoading && (
          <>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={{ lg: '30px', md: '40px', base: '45px' }}
            >
              {posts?.map((post: TypePost, index: number) => (
                <GridItem key={index}>
                  <CardBlog
                    date={post?.date ? formatDate(post.date) : ''}
                    key={index}
                    title={clean(post?.title?.rendered)}
                    tag="Thông báo"
                    desc={clean(post.excerpt.rendered)}
                    image={post?.featured_image || ''}
                    path={`/${post?.slug}`}
                  />
                </GridItem>
              ))}
            </Grid>
            {posts?.length > 0 && !resetpagi && (
              <HStack pt={'32px'} justify={'center'}>
                <StyledPaginate
                  className="paginate"
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={len}
                  onPageChange={handleRouter}
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={1}
                  activeClassName="active"
                  forcePage={Number(page || '1') - 1}
                />
              </HStack>
            )}
          </>
        )}
        {posts?.length === 0 && !isLoading && (
          <>
            <Center placeItems={'center'} height={'40vh'} textAlign={'center'}>
              Không tìm được kết quả phù hợp
            </Center>
          </>
        )}

        {isLoading && <Loading />}
      </Box>
    </>
  );
};
