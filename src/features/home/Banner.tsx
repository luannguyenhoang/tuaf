import { clean } from '@/lib/sanitizeHtml';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface BannerTexts {
  text_1?: string;
  text_2?: string;
  text_3?: string;
  text_4?: string;
  text_5?: string;
  text_6?: string;
  text_7?: string;
  text_8?: string;
  text_9?: string;
  text_10?: string;
  text_11?: string;
  text_12?: string;
  text_13?: string;
  text_14?: string;
}
interface BannerTextss {
  text_1?: string;
  text_2?: string;
  text_3?: string;
  text_4?: string;
  text_5?: string;
  text_6?: string;
  text_7?: string;
  text_8?: string;
  text_9?: string;
  text_10?: string;
  text_11?: string;
}
interface BannerProps {
  list_1: BannerTexts;
  list_2: BannerTextss;
  list_3: { image: string }[];
}

interface BannersComponentProps {
  banners: BannerProps;
}

export const Banners = ({ banners }: BannersComponentProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearTimeout(id);
  }, [currentSlide]);

  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % 4);

  const currentBg = banners?.list_3?.[currentSlide]?.image;
  const listFontSize = useBreakpointValue({ base: '10px', lg: '18px' });

  return (
    <Box py={{ base: 10, md: 10 }} overflow="hidden" position="relative" bg="gray.100">
      {currentBg && (
        <Box position="absolute" inset={0} zIndex={0} w="100%" h="100%">
          <Image
            src={currentBg}
            alt=""
            fill
            priority={currentSlide === 0}
            quality={60}
            sizes="100vw"
            fetchPriority={currentSlide === 0 ? 'high' : undefined}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
      )}
      <Container
        maxW={{ base: '88%', md: '90%' }}
        h={{ base: '44', md: 'xl' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={1}
      >
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="space-between"
          gap={{ base: 6, md: 10 }}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <Box flex="1" color="White" py={{ base: 4, md: 8 }} borderRadius="md">
            {currentSlide === 0 && (
              <Box>
                <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={4} fontWeight="bold">
                  <Box as="span" display="block" paddingBottom={'10px'}>
                    {banners?.list_1?.text_1 || 'Tuyển sinh'}
                  </Box>
                  <Box
                    as="span"
                    fontSize={{ base: '20px', lg: '45px' }}
                    display="block"
                    maxW={{ base: '300px', lg: '600px' }}
                  >
                    {banners?.list_1?.text_2 || 'Cử Nhân Trực Tuyến'}
                  </Box>
                </Heading>
                <Button
                  bg={'#F37021'}
                  color={'white'}
                  p={{ base: '10px', md: '25px' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  _hover={{ bg: '#F34D27FF', color: 'white' }}
                  as={Link}
                  href={'/dang-ky'}
                >
                  Đăng ký tư vấn
                </Button>
              </Box>
            )}

            {currentSlide === 1 && (
              <Box>
                <Text fontSize={{ base: 'md', md: '30px' }} fontWeight="bold">
                  {banners?.list_1?.text_7 || 'Nộp hồ sơ trực tiếp hoặc gửi bưu điện'}
                </Text>
                <Text
                  fontSize={{ base: '20', md: '45px' }}
                  fontWeight="bold"
                  maxW={{ base: '300px', lg: '600px' }}
                >
                  {banners?.list_1?.text_8 || 'Trung tâm Đào tạo trực tuyến'}
                </Text>
                <Text
                  fontSize={{ base: '12px', md: '20px' }}
                  fontWeight="bold"
                  maxW={{ base: '300px', lg: '600px' }}
                  pb={4}
                  dangerouslySetInnerHTML={{
                    __html: clean(
                      banners?.list_1?.text_9 ||
                        'Miền Bắc: Số 116 Trần Vĩ, Phường Mai Dịch, Quận Cầu Giấy, Tp Hà Nội<br />Miền Nam: Số 469 Lê Hồng Phong, Phường 2, Quận 10, Thành phố Hồ Chí Minh'
                    ),
                  }}
                />
                <Button
                  bg={'#F37021'}
                  color={'white'}
                  p={{ base: '10px', md: '25px' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  _hover={{ bg: '#F34D27FF', color: 'white' }}
                  as={Link}
                  href={'/dang-ky'}
                >
                  Đăng ký tư vấn
                </Button>
              </Box>
            )}

            {currentSlide === 2 && (
              <Box>
                {/* slide 3 */}

                <Box
                  as="span"
                  width="100%"
                  fontSize={{ base: '20px', lg: '30px' }}
                  textAlign="center"
                  fontWeight={'bold'}
                  mt="6px"
                >
                  {banners?.list_1?.text_6 || 'KHAI GIẢNG NGÀY '}
                </Box>
                <ul
                  style={{
                    padding: 0,
                    margin: 0,
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    fontSize: listFontSize,
                    paddingBottom: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  <li
                    style={{
                      width: '100%',
                      marginBottom: '5px',
                    }}
                  >
                    {banners?.list_1?.text_3 || 'Lịch khai giảng tại Hà Nội: 12/01/2025'}
                  </li>
                  <li style={{ width: '100%' }}>
                    {banners?.list_1?.text_4 || 'Lịch khai giảng tại Hà Nội: 12/01/2025'}
                  </li>

                  <li
                    style={{
                      width: '100%',
                      marginTop: '5px',
                    }}
                  >
                    {banners?.list_1?.text_10 || 'Lịch khai giảng tại Đà Nẵng: Dự kiến 17/08/2025'}
                  </li>
                  <li
                    style={{
                      width: '100%',
                      marginTop: '5px',
                    }}
                  >
                    {banners?.list_1?.text_11 || 'Lịch khai giảng tại Đà Nẵng: Dự kiến 17/08/2025'}
                  </li>
                </ul>
                <Button
                  bg={'#F37021'}
                  color={'white'}
                  p={{ base: '10px', md: '25px' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  _hover={{ bg: '#F34D27FF', color: 'white' }}
                  as={Link}
                  href={'/dang-ky'}
                >
                  Đăng ký tư vấn
                </Button>
              </Box>
            )}

            {currentSlide === 3 && (
              <Box>
                {/* slide 4 */}
                <Text fontSize={{ base: 'md', md: '30px' }} fontWeight="bold">
                  {banners?.list_1?.text_12 || 'Nộp hồ sơ trực tiếp hoặc gửi bưu điện'}
                </Text>
                <Text
                  fontSize={{ base: '20', md: '45px' }}
                  fontWeight="bold"
                  maxW={{ base: '300px', lg: '600px' }}
                >
                  {banners?.list_1?.text_13 || 'Trung tâm Đào tạo trực tuyến'}
                </Text>
                <Text
                  fontSize={{ base: '12px', md: '20px' }}
                  fontWeight="bold"
                  maxW={{ base: '300px', lg: '600px' }}
                  pb={4}
                  dangerouslySetInnerHTML={{
                    __html: clean(
                      banners?.list_1?.text_14 ||
                        'Miền Bắc: Số 116 Trần Vĩ, Phường Mai Dịch, Quận Cầu Giấy, Tp Hà Nội<br />Miền Nam: Số 469 Lê Hồng Phong, Phường 2, Quận 10, Thành phố Hồ Chí Minh'
                    ),
                  }}
                />
                <Button
                  bg={'#F37021'}
                  color={'white'}
                  p={{ base: '10px', md: '25px' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  _hover={{ bg: '#F34D27FF', color: 'white' }}
                  as={Link}
                  href={'/dang-ky'}
                >
                  Đăng ký tư vấn
                </Button>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
      <IconButton
        bg="white"
        aria-label="Prev slide"
        icon={<FiChevronLeft size={24} />}
        onClick={goPrev}
        position="absolute"
        left={{ base: 2, md: 4 }}
        top="50%"
        transform="translateY(-50%)"
        color="orange.500"
        variant="ghost"
        size="sm"
        _hover={{ bg: 'orange.500', color: 'white' }}
      />
      <IconButton
        aria-label="Next slide"
        icon={<FiChevronRight size={24} />}
        onClick={goNext}
        bg="white"
        position="absolute"
        right={{ base: 2, md: 4 }}
        top="50%"
        transform="translateY(-50%)"
        color="orange.500"
        variant="ghost"
        size="sm"
        _hover={{ bg: 'orange.500', color: 'white' }}
      />
    </Box>
  );
};

export default Banners;
