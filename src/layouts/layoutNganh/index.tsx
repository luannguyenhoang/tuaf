'use client';

import { Box, Container, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const FormWrapper = dynamic(() =>
  import('@/components/FormWrapper').then((mod) => mod.FormWrapper)
);
const HeadSection = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSection)
);
const Counters = dynamic(() => import('@/features/home/Counters').then((mod) => mod.Counters));
const Review = dynamic(() => import('@/features/home/Review').then((mod) => mod.Review));

const Dangky = () => {
  const [page_content, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=lich-khai-giang`, {
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
    <Box>
      <HeadSection
        title={page_content?.acf?.section_2?.title || 'Đăng ký tư vấn miễn phí'}
        subtitle=""
        desc={page_content?.acf?.section_2?.sub_title || 'Đăng ký nhận tư vấn hoàn toàn miễn phí'}
      />
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={'8'} pt={'32px'}>
        <GridItem>
          <Image
            loading="lazy"
            src={page_content?.acf?.section_2?.image || '/phoi-bang.jpg'}
            alt="Phôi bằng Đại học Nông lâm"
            width={600}
            height={800}
            style={{ width: '100%', height: 'auto' }}
          />
        </GridItem>
        <GridItem>
          <FormWrapper />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export const LayoutNganh = ({
  children,
  title,
  title_h2 = false,
}: {
  children?: ReactNode;
  title?: string;
  title_h2?: boolean;
}) => {
  const [home_content, setHomeContent] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5, // Kích hoạt khi 50% của phần tử hiển thị trong viewport
  });

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 },
        });
        const data = await res.json();
        setHomeContent(data?.posts[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    // Kiểm tra xem trongView và isVisible đều là true
    if (inView && !isVisible) {
      setIsVisible(true); // Nếu không thì hiển thị
    }
  }, [inView, isVisible]);

  return (
    <>
      <Box bg="radial-gradient(circle, rgb(5 89 8) 2%, rgb(98 245 124) 100%, rgba(252,89,52,1) 100%)">
        <Container maxW={'7xl'} py="62px">
          <Heading
            as={title_h2 ? 'h2' : 'h1'}
            textAlign={'center'}
            size={'lg'}
            pb="16px"
            color={'white'}
          >
            {title || 'Ngành công nghệ thực phẩm'}
          </Heading>
        </Container>
      </Box>
      <Box>
        <Box bg={'linear-gradient(180deg, rgba(255, 255, 255, 1), #dbfed6 100%)'}>
          <Container maxW={'6xl'}>{children}</Container>
        </Box>
        <Box ref={ref}>
          {isVisible && (
            <>
              <Container maxW={'6xl'} py="64px">
                <Dangky />
              </Container>
              <Counters counter={home_content?.acf?.counter} />
              <Review review={home_content?.acf?.review} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
