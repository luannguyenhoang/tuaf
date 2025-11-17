'use client';

import { Loading } from '@/components/Loading';
import { useModal } from '@/components/ModalContext';
import { TrackingSession } from '@/components/TrackingSession';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Header = dynamic(() => import('./header').then((mod) => mod.Header));

const Footer = dynamic(() => import('./footer').then((mod) => mod.Footer));
const MobileBottomBar = dynamic(
  () => import('./components/MobileBottomBar').then((mod) => mod.MobileBottomBar),
  { ssr: false }
);

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const { isOpen, onOpen } = useModal();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const pathname = usePathname();
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isOpen && onOpen) {
        onOpen();
      }
    }, 10000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Chỉ chạy khi chuyển trang, không phụ thuộc vào isOpen

  return (
    <>
      <Box maxW={'1920px'} mx={'auto'}>
        <TrackingSession />
        <Header />
        {children}
        <Box ref={ref} style={{ height: '1px' }} />
        {inView && <Footer />}
        <MobileBottomBar />
      </Box>
    </>
  );
};

export default Layout;
