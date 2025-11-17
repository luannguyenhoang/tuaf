import { ScrollMotions } from '@/components/ScrollMotion';
import { clean } from '@/lib/sanitizeHtml';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MotionBox = motion(Box);

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [bgUrl, setBgUrl] = useState<string | undefined>(undefined);

  const firstImage = banners?.list_3?.[0]?.image;

  useEffect(() => {
    if (firstImage && typeof window !== 'undefined') {
      const linkId = 'lcp-banner-preload';
      if (document.getElementById(linkId)) return;

      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'preload';
      link.as = 'image';
      link.href = firstImage;
      link.setAttribute('fetchpriority', 'high');
      link.setAttribute('crossorigin', 'anonymous');
      document.head.insertBefore(link, document.head.firstChild);
    }
  }, [firstImage]);

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearTimeout(id);
  }, [currentSlide]);

  const slideVariants = useMemo(
    () => ({
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
      exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
    }),
    []
  );

  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % 4);

  const currentBg = banners?.list_3?.[currentSlide]?.image;
  const listFontSize = useBreakpointValue({ base: '10px', lg: '18px' });

  useEffect(() => {
    if (!currentBg) {
      setIsImageLoaded(false);
      setBgUrl(undefined);
      return;
    }
    setIsImageLoaded(false);
    const img = new Image();
    if (currentSlide === 0) {
      (img as any).fetchPriority = 'high';
    }
    img.src = currentBg;
    img.onload = () => {
      setBgUrl(currentBg);
      setIsImageLoaded(true);
    };
    img.onerror = () => {
      setBgUrl(undefined);
      setIsImageLoaded(true);
    };
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentBg, currentSlide]);

  return (
    <Box
      py={{ base: 10, md: 10 }}
      overflow="hidden"
      position="relative"
      bgImage={bgUrl ? `url(${bgUrl})` : undefined}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
    >
      {firstImage && currentSlide === 0 && (
        <img
          src={firstImage}
          alt=""
          fetchPriority="high"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1,
          }}
          aria-hidden="true"
        />
      )}
      <Skeleton
        isLoaded={isImageLoaded}
        fadeDuration={0.2}
        startColor="gray.200"
        endColor="gray.300"
        position="absolute"
        inset={0}
        zIndex={0}
        pointerEvents="none"
      />
      <Container
        maxW={{ base: '88%', md: '90%' }}
        h={{ base: '44', md: 'xl' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={1}
        opacity={isImageLoaded ? 1 : 0}
        transition="opacity 0.2s ease-in-out"
        pointerEvents={isImageLoaded ? 'auto' : 'none'}
      >
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="space-between"
          gap={{ base: 6, md: 10 }}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <MotionBox flex="1" color="White" py={{ base: 4, md: 8 }} borderRadius="md">
            <AnimatePresence mode="wait">
              {currentSlide === 0 && (
                <MotionBox
                  key="slide-1"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* slide 1 */}
                  <ScrollMotions delay={0.01}>
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
                  </ScrollMotions>
                  {/* slide 1 */}
                </MotionBox>
              )}

              {currentSlide === 1 && (
                <MotionBox
                  key="slide-2"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* slide 2 */}
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
                  {/* slide 2 */}
                </MotionBox>
              )}

              {currentSlide === 2 && (
                <MotionBox
                  key="slide-3"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
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
                      {banners?.list_1?.text_10 ||
                        'Lịch khai giảng tại Đà Nẵng: Dự kiến 17/08/2025'}
                    </li>
                    <li
                      style={{
                        width: '100%',
                        marginTop: '5px',
                      }}
                    >
                      {banners?.list_1?.text_11 ||
                        'Lịch khai giảng tại Đà Nẵng: Dự kiến 17/08/2025'}
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
                  {/* slide 3 */}
                </MotionBox>
              )}

              {currentSlide === 3 && (
                <MotionBox
                  key="slide-4"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
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
                  {/* slide 2 */}
                </MotionBox>
              )}
            </AnimatePresence>

            {/* simple dots indicator */}
          </MotionBox>
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
