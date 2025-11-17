'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeadSection = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSection)
);

interface Props {
  children: React.ReactNode;
}
interface Support {
  name: string;
  sub_name: string;
  desc: string;
  image: string;
}
interface HeadSectionData {
  title: string;
  desc: string;
}
interface Listsgroup {
  testimonial_1: Support;
  testimonial_2: Support;
  testimonial_3: Support;
  testimonial_4: Support;
}
interface ReviewProps {
  review: {
    headsection: HeadSectionData;
    testimonial: Listsgroup;
  };
}

const Testimonial = (props: Props) => {
  const { children } = props;

  return <Box>{children}</Box>;
};

const TestimonialContent = (props: Props) => {
  const { children } = props;

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = (props: Props) => {
  const { children } = props;

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props: Props) => {
  const { children } = props;

  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
      minH={'130px'}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }: { src: string; name: string; title: string }) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Box overflow={'hidden'} w={'50px'} height={'50px'} borderRadius={'50%'}>
        <Image
          loading="lazy"
          src={src}
          alt="Ảnh nhân vật"
          width={305}
          height={405}
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text
          textAlign={'center'}
          fontSize={'sm'}
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export const Review = ({ review }: ReviewProps) => {
  return (
    <Box bg={'linear-gradient(180deg, rgba(255, 255, 255, 1), #dbfed6 100%)'} py={'48px'}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <HeadSection
          subtitle="Review"
          title_h2={true}
          title={review?.headsection?.title || 'Đánh giá của học viên'}
          desc={
            review?.headsection?.desc ||
            'Cùng lắng nghe những đánh giá của học viên đã tốt nghiệp hệ đào tạo từ xa tại Trường Đại học Nông lâm Thái Nguyên'
          }
        />
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={'8'}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {review?.testimonial?.testimonial_1?.name || 'Cao Thanh Quý'}
              </TestimonialHeading>
              <TestimonialText>
                {review?.testimonial?.testimonial_1?.desc ||
                  'Sau khi trải qua 4 học kì thì tôi cảm thấy chương trình học online này là chương trình hữu ích. Khóa học giúp tôi nâng cao kỹ năng sử dụng online platform được thiết kế tương tự với phần mềm của các công ty có kỹ thuật hiện đại. Ở mỗi học kỳ có lịch trình cụ thể, tài liệu học tập rõ ràng và mang tính áp dụng cao. Đội ngũ giáo viên có kinh nghiệm và phần lớn được đào tạo ở nước ngoài nên rất chuyên nghiệp.'}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={review?.testimonial?.testimonial_1?.image || '/1.jpg'}
              name={review?.testimonial?.testimonial_1?.name || 'Cao Thanh Quý'}
              title={
                review?.testimonial?.testimonial_1?.sub_name ||
                'Chuyên viên phòng Quản lý Tài nguyên Môi trường tỉnh Bình Dương'
              }
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {review?.testimonial?.testimonial_2?.name || 'Phạm Hồng Nam'}
              </TestimonialHeading>
              <TestimonialText>
                {review?.testimonial?.testimonial_2?.desc ||
                  'Đội ngũ cố vấn học tập tại chương trình đào tạo từ xa trường Đại học Nông Lâm Thái Nguyên tư vấn rất nhiệt tình, hướng dẫn cụ thể về quá trình học và làm các bài kiểm tra, các vấn đề cần lưu ý để đảm bảo việc tốt nghiệp đúng thời hạn'}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={review?.testimonial?.testimonial_2?.image || '/2.jpg'}
              name={review?.testimonial?.testimonial_2?.name || 'Phạm Hồng Nam'}
              title={
                review?.testimonial?.testimonial_2?.sub_name ||
                'Nghiên cứu sinh ngành Nông nghiệp Công nghệ cao tại Đan Mạch'
              }
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {review?.testimonial?.testimonial_3?.name || 'Nguyễn Hoàng Tú'}
              </TestimonialHeading>
              <TestimonialText>
                {review?.testimonial?.testimonial_3?.desc ||
                  'Chương trình đào tạo đại học từ xa của trường rất hay và tiện lợi vì tôi không cần phải tới trường học trực tiếp mà có thể học ở bất kỳ đâu, giúp sinh viên biết thêm nhiều kiến thức mới để hỗ trợ thật tốt cho công việc tại cơ quan'}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={review?.testimonial?.testimonial_3?.image || '/3.jpg'}
              name={review?.testimonial?.testimonial_3?.name || 'Nguyễn Hoàng Tú'}
              title={
                review?.testimonial?.testimonial_3?.sub_name ||
                'Giảng viên ngành Kinh tế Quốc tế chuyên ngành Xuất nhập khẩu Nông sản'
              }
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {review?.testimonial?.testimonial_4?.name || 'Phạm Đức Mạnh'}
              </TestimonialHeading>
              <TestimonialText>
                {review?.testimonial?.testimonial_4?.desc ||
                  'Tôi đánh giá cao hình thức học online trên hệ thống E-learning và các kiến thức được cung cấp tại chương trình học, trong quá trình học tôi có thể nắm được kiến thức nền tảng cơ bản và những tài liệu được chia sẻ.'}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={review?.testimonial?.testimonial_4?.image || '/4.jpg'}
              name={review?.testimonial?.testimonial_4?.name || 'Phạm Đức Mạnh'}
              title={review?.testimonial?.testimonial_4?.sub_name || 'Co-Founder Dalat Farm Food'}
            />
          </Testimonial>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
