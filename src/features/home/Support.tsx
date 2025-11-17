import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { BiSupport } from 'react-icons/bi';
import { GiSpookyHouse } from 'react-icons/gi';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';

const HeadSection = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSection)
);

interface Support {
  title: string;
  desc: string;
}
interface HeadSectionData {
  headsection_title: string;
  headsection_desc: string;
}
interface Listsgroup {
  group_1: Support;
  group_2: Support;
  group_3: Support;
  group_4: Support;
}
interface SupportProps {
  support: {
    headsection: HeadSectionData;
    support_image: string;
    accsupport: Listsgroup;
  };
}

export const AccSupport = ({ support }: SupportProps) => {
  const accSupport = [
    {
      icon: <GiSpookyHouse />,
      title: support?.accsupport?.group_1?.title || 'Sở hữu Bằng Đại học uy tín',
      content:
        support?.accsupport?.group_1?.desc ||
        'Bằng Kỹ sư/Cử nhân không ghi hình thức đào tạo và được Bộ Giáo dục công nhận, Có giá trị sử dụng trọn đời',
    },

    {
      icon: <SlCalender />,
      title: support?.accsupport?.group_2?.title || 'Thời gian đào tạo',
      content:
        support?.accsupport?.group_2?.desc ||
        'Thời gian đào tạo từ 2 - 4.5 năm giúp người học có thể học vượt để rút ngắn thời gian học tập theo quy định đào tạo tín chỉ',
    },

    {
      icon: <BiSupport />,
      title: support?.accsupport?.group_3?.title || 'Đội ngũ cố vấn',
      content:
        support?.accsupport?.group_3?.desc ||
        ' Tư vấn 24/7 - Hỗ trợ học tập và kỹ thuật nhanh chóng - tận tình',
    },

    {
      icon: <MdOutlineLocalShipping />,
      title: support?.accsupport?.group_4?.title || 'Kho học liệu hoàn toàn miễn phí',
      content:
        support?.accsupport?.group_4?.desc ||
        'Tài liệu học tập đa Phương tiện (video, slide, script,...), giáo trình do Trường Đại học Nông lâm Thái Nguyên biên soạn',
    },
  ];
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {accSupport.map((acc, index) => (
        <AccordionItem border={'none'} key={index} py={'12px'} color={'red.700'}>
          <AccordionButton bg={'gray.50'} py="16px" rounded={'md'}>
            <Box flex="1" textAlign="left">
              <HStack>
                {acc.icon}
                <Heading as={'h3'} fontSize={{ base: 'sm', md: 'md' }} color={'green.900'}>
                  {acc.title}
                </Heading>
              </HStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} color={'green.900'}>
            {acc.content}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const Support = ({ support }: SupportProps) => {
  return (
    <Box py={'48px'}>
      <Container maxW={'6xl'}>
        <HeadSection
          title_h2={true}
          title={support?.headsection?.headsection_title || 'TUAF DÀNH TẶNG BẠN NHIỀU TIỆN ÍCH'}
          subtitle="support"
          desc={
            support?.headsection?.headsection_desc ||
            'Trường Đại học Nông lâm Thái Nguyên hỗ trợ bạn nhiều lợi ích'
          }
        />
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={'36px'} pt={'24px'}>
          <GridItem>
            <Image
              loading="lazy"
              src={support?.support_image || `/support.png`}
              alt="Kết hợp online và oflinet"
              width={600}
              height={400}
              quality={70}
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
            />
            <Text fontWeight={'bold'} textAlign={'center'}>
              Hỗ trợ - Trường Đại học Nông lâm Thái Nguyên
            </Text>
          </GridItem>
          <GridItem>
            <AccSupport support={support} />
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
