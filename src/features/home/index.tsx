'use client';

import { Loading } from '@/components/Loading';
import { useModal } from '@/components/ModalContext';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Banner = dynamic(() => import('./Banner').then((mod) => mod.Banners), {
  loading: () => <Loading />,
});
const TextScroll = dynamic(() => import('./TextScroll').then((mod) => mod.TextScrollHomePage), {
  loading: () => <Loading />,
});
const Categorys = dynamic(() => import('./Categorys').then((mod) => mod.Categorys), {
  loading: () => <Loading />,
});
const Benefit = dynamic(() => import('./Benefit').then((mod) => mod.Benefit), {
  loading: () => <Loading />,
});
const Contact = dynamic(() => import('./Contact').then((mod) => mod.Contact), {
  loading: () => <Loading />,
});
const Counters = dynamic(() => import('./Counters').then((mod) => mod.Counters), {
  loading: () => <Loading />,
});
const Event = dynamic(() => import('./Event').then((mod) => mod.Event), {
  loading: () => <Loading />,
});

const Review = dynamic(() => import('./Review').then((mod) => mod.Review), {
  loading: () => <Loading />,
});

const Support = dynamic(() => import('./Support').then((mod) => mod.Support), {
  loading: () => <Loading />,
});

export const Home = () => {
  const { isOpen, onOpen } = useModal();
  const [posts, setPosts] = useState<any>(null);
  const [homeContent, setHomeContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Tối ưu gọi API cho cả bài viết và nội dung trang chủ trong một useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bài viết
        const resPosts = await fetch(`/api/posts/?type=news&page=1`, {
          next: { revalidate: 3 },
        });
        if (!resPosts.ok) {
          throw new Error(`Posts fetch failed with status: ${resPosts.statusText}`);
        }
        const dataPosts = await resPosts.json();
        setPosts(dataPosts?.posts);
        // Fetch nội dung trang chủ
        const resContent = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 },
        });
        if (!resContent.ok) {
          throw new Error(`Content fetch failed with status: ${resContent.statusText}`);
        }
        const dataContent = await resContent.json();
        setHomeContent(dataContent?.posts[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isOpen && onOpen) onOpen();
    }, 10000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi component mount

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);
  return (
    <>
      <Banner banners={homeContent?.acf?.text_banner_t} />
      <Box pos={'sticky'} top={'92px'} zIndex={3}>
        <TextScroll />
      </Box>
      <Categorys categorys={homeContent?.acf?.lists_categorys} />
      <Box ref={ref}>
        {isVisible && (
          <>
            <Benefit benefit={homeContent?.acf?.benefit} />
            <Support support={homeContent?.acf?.support} />
            <Counters counter={homeContent?.acf?.counter} />
            <Review review={homeContent?.acf?.review} />
            <Contact contact={homeContent?.acf?.contact} />
            {isLoading ? <Loading /> : <Event posts={posts} />}
          </>
        )}
      </Box>
    </>
  );
};
