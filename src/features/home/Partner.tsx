import { Container, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSize } from '../../hooks/useSizeWindow';

export const StyledContainer = styled(Container)`
  .mySwiper {
    padding-bottom: 38px;
  }
`;

export const Partner = () => {
  const { size } = useSize();

  const partners = [`/viettel.png`, `/vtv7.png`, `/na.png`, `/vn-ex.png`, `/pana.png`];

  return (
    <StyledContainer maxW="6xl">
      <Heading size={'lg'} textAlign={'center'} pb={'24px'}>
        Đối tác của Evstep
      </Heading>
      <Swiper
        slidesPerView={(size.width < 480 && 3) || (size.width < 992 && 4) || 5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            {
              <Image
                loading="lazy"
                width={200}
                height={150}
                src={partner}
                alt="Đối tác Evstep"
                quality={70}
                sizes="(max-width: 480px) 100px, 200px"
              />
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledContainer>
  );
};
