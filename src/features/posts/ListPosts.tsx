'use client';

import { Loading } from '@/components/Loading';
import { clean } from '@/lib/sanitizeHtml';
import { Box, Grid, HStack, Heading, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const CardBlogVert = dynamic(() =>
  import('@/components/CardBlogVert').then((mod) => mod.CardBlogVert)
);
const LayoutBottom = dynamic(() =>
  import('@/layouts/layoutPosts/LayoutBottom').then((mod) => mod.LayoutBottom)
);

const StyledPaginate = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
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

export const ListPosts = ({
  handleRouter,
}: {
  handleRouter?: ({ selected }: { selected: number }) => void;
}) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState('0');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/?type=news&page=${page}`, {
          next: { revalidate: 3 },
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data: { posts: any[]; totalPosts: string } = await res.json();

        const { posts, totalPosts } = data;
        posts?.length && setPosts(posts);
        totalPosts && setTotalPosts(totalPosts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, [page]);

  const len = Math.ceil(Number(totalPosts) / 10) || 1;

  return (
    <LayoutBottom sticky="120px">
      <Box>
        <Heading size={'lg'} pb={'20px'} textAlign={{ base: 'center', lg: 'start' }}>
          Tin tức
        </Heading>
        {/* <VStack pb={"20px"}>
          <CardBlogVert
            title={"Thư ngỏ hợp tác"}
            desc={
              "Kính gửi Quý Doanh nghiệp.Trước tiên, Trường Đại học Nông Lâm Thái Nguyên xin gửi lời chào trân trọng và lời chúc sức khỏe, thành công đến Quý Doanh nghiệp. Trường Đại học Nông Lâm Thái Nguyên hướng tới mục tiêu trở thành một trong những trường đại học hàng đầu Việt Nam về lĩnh vực nông lâm nghiệp, tài nguyên và môi trường vào năm 2030 và được công nhận trong hệ thống kiểm định chất lượng giáo dục Đông Nam Á (AUN - QA)..."
            }
            tag="Hợp tác"
            image={"/hop-tac.png"}
            path={`/hop-tac`}
          />
        </VStack> */}
        {!isLoading && (
          <VStack spacing={'16px'}>
            {posts?.map((post: any, index: number) => (
              <CardBlogVert
                key={index}
                title={clean(post?.title?.rendered)}
                desc={clean(post.excerpt.rendered)}
                tag="tin tức"
                image={post?.featured_image || ''}
                path={`/${post?.slug}`}
              />
            ))}
            {posts?.length === 0 && (
              <Grid placeItems={'center'} height={'40vh'}>
                Dữ liệu đang được chúng tôi cập nhập
              </Grid>
            )}
            <HStack pt={'32px'} justify={'center'}>
              <StyledPaginate
                className="paginate"
                previousLabel="<"
                nextLabel=">"
                pageCount={Math.ceil(Number(totalPosts) / 10)}
                onPageChange={handleRouter}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                activeClassName="active"
                forcePage={Number(page) - 1}
              />
            </HStack>
          </VStack>
        )}

        {isLoading && <Loading />}
      </Box>
    </LayoutBottom>
  );
};
