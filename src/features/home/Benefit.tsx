'use client';

import { Box, Center, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeadSection = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSection)
);

interface Category {
  benefit_image: string;
  benefit_title: string;
  benefit_desc: string;
}

interface HeadSectionData {
  headsection_title: string;
  headsection_desc: string;
}

interface Listsbenefit {
  benefit_1: Category;
  benefit_2: Category;
  benefit_3: Category;
  benefit_4: Category;
}
interface BenefitProps {
  benefit: {
    headsection: HeadSectionData;
    lists_benefit: Listsbenefit;
  };
}

export const Item = ({
  title,
  desc,
  image,
  bg,
}: {
  title: string;
  desc: string;
  image: string;
  bg?: string;
}) => {
  return (
    <Box bg={bg} p={{ base: '20px', lg: '24px' }} rounded={'sm'}>
      <Center height={'90px'}>
        <Image
          loading="lazy"
          src={image}
          alt={title}
          width={60}
          height={60}
          quality={70}
          style={{ width: 'auto', height: 'auto' }}
        />
      </Center>
      <Center>
        <Heading as={'h3'} size={{ base: 'sm' }} textAlign={'center'} py={'16px'}>
          {title}
        </Heading>
      </Center>
      <Center>
        <Text fontSize={{ base: '.7rem', md: '.8rem' }} textAlign={'center'}>
          {desc}
        </Text>
      </Center>
    </Box>
  );
};

export const Benefit = ({ benefit }: BenefitProps) => {
  const benefits = [
    {
      title:
        benefit?.lists_benefit?.benefit_1?.benefit_title ||
        'Thời gian học tập linh hoạt, phù hợp với mọi đối tượng',
      desc:
        benefit?.lists_benefit?.benefit_1?.benefit_desc ||
        'Với hình thức học tập online, học viên có thể chủ động về kế hoạch cũng như thời gian học tập, đây là ưu điểm vượt trội của chương trình',
      image: benefit?.lists_benefit?.benefit_1?.benefit_image || '/icon2.png',
      bg: 'green.800',
    },
    {
      title:
        benefit?.lists_benefit?.benefit_2.benefit_title ||
        'Sở hữu bằng đại học uy tín hàng đầu Việt Nam',
      desc:
        benefit?.lists_benefit?.benefit_2?.benefit_desc ||
        'Chương trình học do Trường Đại học Nông lâm Thái Nguyên cấp bằng và được Bộ GD&ĐT công nhận',
      image: benefit?.lists_benefit?.benefit_2?.benefit_image || '/icon1.png',
      bg: 'green.600',
    },
    {
      title:
        benefit?.lists_benefit?.benefit_3?.benefit_title ||
        'Đội ngũ giảng viên đầu ngành, giàu kinh nghiệm',
      desc:
        benefit?.lists_benefit?.benefit_3?.benefit_desc ||
        '100% giảng viên tham gia chương trình đều có bằng Thạc sĩ, Tiến sĩ và đều đang giảng dạy và làm việc tại trường',
      image: benefit?.lists_benefit?.benefit_3?.benefit_image || '/icon3.png',
      bg: 'green.800',
    },
    {
      title:
        benefit?.lists_benefit?.benefit_4?.benefit_title || '96% Sinh viên ra trường có việc làm',
      desc:
        benefit?.lists_benefit?.benefit_4?.benefit_desc ||
        'Dễ dàng hơn khi xin việc, xét bậc tăng lương. Tốt nghiệp bạn đủ điều kiện để học lên Thạc sĩ, Tiến sĩ theo quy định',
      image: benefit?.lists_benefit?.benefit_4?.benefit_image || '/icon4.png',
      bg: 'green.600',
    },
  ];
  return (
    <Box
      bg={'linear-gradient(180deg, rgba(255, 255, 255, 1), #dbfed6 100%)'}
      py={'48px'}
      color={'white'}
    >
      <Container maxW="6xl">
        <HeadSection
          title_h2={true}
          title={benefit?.headsection?.headsection_title || 'Giá trị bạn nhận được từ chương trình'}
          subtitle="benefit"
          desc={
            benefit?.headsection?.headsection_desc ||
            'Những giá trị bạn sẽ nhận được từ chương trình của Đại học Nông lâm Thái Nguyên'
          }
        />
        <SimpleGrid pt={'24px'} spacing={'8'} columns={{ base: 1, md: 2, lg: 4 }}>
          {benefits.map((categoty, index) => (
            <Item
              key={index}
              title={categoty.title}
              desc={categoty.desc}
              image={categoty.image}
              bg={categoty.bg}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
