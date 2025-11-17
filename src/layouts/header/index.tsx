'use client';

import { useModal } from '@/components/ModalContext';
import { Box, Container, Divider, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';

const BtnTheme = dynamic(() => import('@/components/BtnTheme').then((mod) => mod.BtnTheme), {
  loading: () => <Box w="120px" h="40px" />,
});
const FormWrapper = dynamic(
  () => import('@/components/FormWrapper').then((mod) => mod.FormWrapper),
  { loading: () => null }
);
const ModalBase = dynamic(() => import('@/components/Modal').then((mod) => mod.ModalBase), {
  loading: () => null,
});
const DesktopNav = dynamic(
  () => import('@/layouts/components/DeskhopNav').then((mod) => mod.DesktopNav),
  { loading: () => null }
);
const HeaderTop = dynamic(
  () => import('@/layouts/components/HeaderTop').then((mod) => mod.HeaderTop),
  { loading: () => null }
);
const MobileNav = dynamic(
  () => import('@/layouts/components/MobileNav').then((mod) => mod.MobileNav),
  { loading: () => null }
);

export const Header = () => {
  const { isOpen, onOpen, onToggle, onClose } = useModal();
  const [dataForm, setDataForm] = useState<{ id: string; href: string }>({
    id: '',
    href: '',
  });

  // Fetch form data once on mount
  useEffect(() => {
    const getFormData = async () => {
      try {
        const res = await fetch(`/api/data-form/?type=form-main`);
        if (!res.ok) throw new Error(`Failed to fetch form data with status: ${res.statusText}`);

        const data: { id: string; href: string } = await res.json();
        if (data?.id || data?.href) setDataForm(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    getFormData();
  }, []);

  return (
    <>
      <Box
        pos={'relative'}
        _before={{
          content: "''",
          width: '5e3px',
          height: '100%',
          backgroundImage:
            '-webkit-gradient(linear,left top,left bottom,from(#00843E),to(#064121));',
          position: 'absolute',
          top: 0,
          right: '36%',
          zIndex: -1,
          transform: 'skew(-30deg)',
          WebkitTransformOrigin: 'left bottom',
        }}
      >
        <Container maxW="6xl" py="6px">
          <HeaderTop />
        </Container>
      </Box>
      <Divider />
      <Box boxShadow="md" pos={'sticky'} top={'0'} left={0} right={0} zIndex={10} bg={'white'}>
        <Container
          as={Flex}
          bg={'white'}
          color={'gray.600'}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={'center'}
          maxW="6xl"
        >
          <Flex ml={{ base: -2 }} display={{ base: 'flex', lg: 'none' }}>
            <MobileNav />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', lg: 'start' }} align={'center'}>
            <Logo />
            <Flex display={{ base: 'none', lg: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          <BtnTheme colorScheme="red" size={{ base: 'sm', md: 'lg' }} onClick={onToggle}>
            Đăng ký tư vấn
          </BtnTheme>
        </Container>
      </Box>
      <ModalBase
        isOpen={isOpen || false}
        onOpen={() => onOpen && onOpen()}
        onClose={() => onClose && onClose()}
      >
        <FormWrapper type="form-poup" />
      </ModalBase>
    </>
  );
};
