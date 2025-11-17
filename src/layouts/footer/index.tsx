'use client';

import { useModal } from '@/components/ModalContext';
import {
  Box,
  Container,
  GridItem,
  Heading,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiThreads, SiZalo } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import { Logo } from '../components/Logo';
import { MobileBottomBar } from '../components/MobileBottomBar';

const InputRes = dynamic(() => import('@/components/InputRes').then((mod) => mod.InputRes));

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text as="div" fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  const { onOpen } = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5, // Kích hoạt khi 50% của phần tử hiển thị trong viewport
  });

  useEffect(() => {
    // Kiểm tra xem trongView và isVisible đều là true
    if (inView && !isVisible) {
      setIsVisible(true); // Nếu không thì hiển thị
    }
  }, [inView, isVisible]);

  const [page_content, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
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

  const socialLinks: { label: string; href: string; Icon: IconType }[] = [
    {
      label: 'Facebook',
      href:
        page_content?.acf?.block_34?.block_4?.link_icon_facebook ||
        'https://www.facebook.com/daihoctuxa.etuaf/',
      Icon: FaFacebook,
    },
    {
      label: 'Tiktok',
      href:
        page_content?.acf?.block_34?.block_4?.link_icon_tiktok ||
        'https://www.tiktok.com/@toiyeunongnghiep',
      Icon: FaTiktok,
    },
    {
      label: 'Youtube',
      href:
        page_content?.acf?.block_34?.block_4?.link_icon_youtube ||
        'https://www.tiktok.com/@toiyeunongnghiep',
      Icon: FaYoutube,
    },
    {
      label: 'Zalo',
      href:
        page_content?.acf?.block_34?.block_4?.link_icon_zalo ||
        'https://www.tiktok.com/@toiyeunongnghiep',
      Icon: SiZalo,
    },
    {
      label: 'X',
      href:
        page_content?.acf?.block_34?.block_4?.link_icon_x ||
        'https://www.tiktok.com/@toiyeunongnghiep',
      Icon: FaXTwitter,
    },
    {
      label: 'Threads',
      href: page_content?.acf?.block_34?.block_4?.link_icon_thread || 'https://www.threads.net/',
      Icon: SiThreads,
    },
  ];

  return (
    <>
      <Box bg={'green.800'} color={'White'}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 10 }} spacing={8}>
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <Stack align={'flex-start'}>
                <Heading size="md" mb={4} as="h3">
                  {page_content?.acf?.top_footer?.info?.name ||
                    'TRƯỜNG ĐẠI HỌC NÔNG LÂM THÁI NGUYÊN'}
                </Heading>
                <Text>
                  {page_content?.acf?.top_footer?.info?.address ||
                    'Địa chỉ: Tổ 10, Xã Quyết Thắng, TP Thái Nguyên, Thái Nguyên'}
                </Text>
                <ListHeader>
                  {page_content?.acf?.block_12?.block_1?.title || 'Trạm tuyển sinh'}
                </ListHeader>
                <Box>
                  {page_content?.acf?.block_12?.block_1?.desc ||
                    'Trường Đại học Nông lâm Thái Nguyên - trạm tuyển sinh AUM'}
                </Box>
                <UnorderedList>
                  <ListItem>
                    {page_content?.acf?.block_12?.block_1?.list_1 ||
                      'Hà Nội: Số 116 Trần Vĩ, Phường Mai Dịch, Quận Cầu Giấy, Thành Phố Hà Nội'}
                  </ListItem>
                  <ListItem>
                    {page_content?.acf?.block_12?.block_1?.list_2 ||
                      'Hồ Chí Minh: Số 91 Ký Con, phường Nguyễn Thái Bình, Quận 1, TP Hồ Chí Minh'}
                  </ListItem>
                  <ListItem>
                    {page_content?.acf?.block_12?.block_1?.list_3 ||
                      'Số 101B Lê Hữu Trác, Phước Mỹ, Sơn Trà, Đà Nẵng'}
                  </ListItem>
                  <ListItem>
                    {page_content?.acf?.block_12?.block_1?.list_4 ||
                      'Nhật Bản: Số 1 Chome-3-2 Kagamiyama, Higashihiroshima, Hiroshima 739-0046'}
                  </ListItem>
                </UnorderedList>
                <Box
                  as={Link}
                  prefetch={false}
                  href={`tel:${page_content?.acf?.block_12?.block_1?.contact_1 || '0941011771'}`}
                >
                  Hotline:
                  {page_content?.acf?.block_12?.block_1?.contact_1 || '0941011771'}
                </Box>
                <Box
                  as={Link}
                  prefetch={false}
                  href={`mailto:${
                    page_content?.acf?.block_12?.block_1?.contact_2 || 'tuaf@gvcn.vn'
                  }`}
                >
                  Email:
                  {page_content?.acf?.block_12?.block_1?.contact_2 || 'tuaf@gvcn.vn'}
                </Box>
              </Stack>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Stack align={'flex-start'}>
                <ListHeader>{page_content?.acf?.block_12?.block_2?.title || 'Hỗ trợ'}</ListHeader>
                <Link
                  prefetch={false}
                  href={page_content?.acf?.block_12?.block_2?.link_1 || '/gioi-thieu'}
                >
                  {page_content?.acf?.block_12?.block_2?.text_1 || 'Về chúng tôi'}
                </Link>
                <Link
                  prefetch={false}
                  href={page_content?.acf?.block_12?.block_2?.link_2 || '/lich-khai-giang'}
                >
                  {page_content?.acf?.block_12?.block_2?.text_2 || 'Lịch khai giảng'}
                </Link>
                <Link
                  prefetch={false}
                  href={page_content?.acf?.block_12?.block_2?.link_3 || '/dang-ky'}
                >
                  {page_content?.acf?.block_12?.block_2?.text_3 || 'Đăng ký'}
                </Link>
                <Link
                  prefetch={false}
                  href={page_content?.acf?.block_12?.block_2?.link_4 || '/tin-tuc'}
                >
                  {page_content?.acf?.block_12?.block_2?.text_4 || 'Tin tức'}
                </Link>
                <Link
                  prefetch={false}
                  href={
                    page_content?.acf?.block_12?.block_2?.link_5 ||
                    'https://tuaf.vn/chinh-sach-quyen-rieng-tu'
                  }
                >
                  {page_content?.acf?.block_12?.block_2?.text_5 || 'Chính sách'}
                </Link>
                <Link prefetch={false} href={'/hop-tac'} style={{ marginTop: '4px' }}>
                  <Image
                    loading="lazy"
                    src={page_content?.acf?.block_12?.block_2?.image || '/hop-tac.png'}
                    alt="Tìm đối tác"
                    width={348}
                    height={232}
                    quality={60}
                    sizes="(max-width: 768px) 100vw, 348px"
                  />
                </Link>
              </Stack>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Stack align={'flex-start'}>
                <ListHeader>
                  {page_content?.acf?.block_34?.block_3?.title || 'Nhận diện'}
                </ListHeader>
                <Logo logo={page_content?.acf?.block_34?.block_3?.image_logo || `/logo-tuaf.png`} />
                <ListHeader>
                  {page_content?.acf?.block_34?.block_3?.title_2 || 'Hợp tác tuyển sinh'}
                </ListHeader>
                <Link prefetch={false} href={'https://timdoitac.aum.edu.vn/'}>
                  <Image
                    loading="lazy"
                    src={page_content?.acf?.block_34?.block_3?.image || '/timdoitac.jpg'}
                    alt="Tìm đối tác"
                    width={348}
                    height={232}
                    quality={60}
                    sizes="(max-width: 768px) 100vw, 348px"
                  />
                </Link>
              </Stack>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <Stack align={'flex-start'}>
                <ListHeader>
                  {page_content?.acf?.block_34?.block_4?.title || 'Mạng xã hội'}
                </ListHeader>
                <SimpleGrid columns={6} spacing={6}>
                  <SocialButton
                    label={'Facebook'}
                    href={
                      page_content?.acf?.block_34?.block_4?.link_icon_facebook ||
                      'https://www.facebook.com/daihoctuxa.etuaf/'
                    }
                  >
                    <FaFacebook />
                  </SocialButton>
                  {/* <SocialButton label={"YouTube"} href={"#"}>
                  <FaYoutube />
                </SocialButton> */}
                  <SocialButton
                    label={'Tiktok'}
                    href={
                      page_content?.acf?.block_34?.block_4?.link_icon_tiktok ||
                      'https://www.tiktok.com/@toiyeunongnghiep'
                    }
                  >
                    <FaTiktok />
                  </SocialButton>
                  <SocialButton
                    label={'Youtube'}
                    href={
                      page_content?.acf?.block_34?.block_4?.link_icon_youtube ||
                      'https://www.tiktok.com/@toiyeunongnghiep'
                    }
                  >
                    <FaYoutube />
                  </SocialButton>
                  <SocialButton
                    label={'Zalo'}
                    href={
                      page_content?.acf?.block_34?.block_4?.link_icon_zalo ||
                      'https://www.tiktok.com/@toiyeunongnghiep'
                    }
                  >
                    <SiZalo />
                  </SocialButton>
                  <SocialButton
                    label={'X'}
                    href={
                      page_content?.acf?.block_34?.block_4?.link_icon_x ||
                      'https://www.tiktok.com/@toiyeunongnghiep'
                    }
                  >
                    <FaXTwitter />
                  </SocialButton>
                  <SocialButton
                    label={'Threads'}
                    href={
                      page_content?.acf?.block_34?.block_4?.link_icon_thread ||
                      'https://www.threads.net/'
                    }
                  >
                    <SiThreads />
                  </SocialButton>
                </SimpleGrid>
                <ListHeader>
                  <Box style={{ marginTop: '16px' }}>
                    {page_content?.acf?.block_5?.title || 'Các ngành đào tạo đại học từ xa'}
                  </Box>
                </ListHeader>
                {Array.from({ length: 11 }, (_, index) => {
                  const idx = index + 1;
                  const text = page_content?.acf?.block_5?.[`title_${idx}`] || '';
                  const href = page_content?.acf?.block_5?.[`link_${idx}`] || '/';
                  return { text, href, idx };
                })
                  .filter((item) => Boolean(item.text))
                  .map((item) => (
                    <Link prefetch={false} href={item.href} key={item.idx}>
                      {item.text}
                    </Link>
                  ))}
              </Stack>
            </GridItem>
          </SimpleGrid>
        </Container>

        <Box borderTopWidth={1} borderStyle={'solid'} borderColor={'gray.200'}>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ md: 'center' }}
            align={{ md: 'center' }}
          >
            <Text textAlign="center">© 2023 Copyright by IT AUM</Text>
          </Container>
        </Box>
      </Box>
    </>
  );
};
