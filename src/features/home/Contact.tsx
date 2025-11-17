'use client';

import styles from '@/styles/Home.module.css';
import { Box, Container, GridItem, List, ListIcon, ListItem, SimpleGrid } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const HeadSectionLight = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSectionLight)
);
const FormWrapper = dynamic(() =>
  import('@/components/FormWrapper').then((mod) => mod.FormWrapper)
);

interface HeadSectionData {
  title: string;
  desc: string;
}
interface Listsgroup {
  list_1: string;
  list_2: string;
  list_3: string;
  list_4: string;
  list_5: string;
  list_6: string;
}
interface ContactProps {
  contact: {
    headsection: HeadSectionData;
    list: Listsgroup;
  };
}

export const Contact = ({ contact }: ContactProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const lists = [
    contact?.list?.list_1 || 'KHÔNG phải thi đầu vào, chỉ xét tuyển hồ sơ',
    contact?.list?.list_2 || 'KHÔNG phải đến trường, học online mọi lúc mọi nơi',
    contact?.list?.list_3 || 'TIẾT KIỆM chi phí, chủ động thời gian học tập',
    contact?.list?.list_4 ||
      'Tốt nghiệp THPT là đủ điều kiện đăng ký, rút ngắn thời gian khi đã có bằng ĐH, CĐ',
    contact?.list?.list_5 || 'BẲNG ĐỎ được Bộ GD&ĐT công nhận, có giá trị toàn quốc',
    contact?.list?.list_6 ||
      'Đủ điều kiện học lên cao học, xét bậc lương, thi công chức theo đúng quy định',
  ];

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  return (
    <Box pos={'relative'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'}>
      <Container
        maxW={'6xl'}
        py={'66px'}
        pos={'absolute'}
        top={0}
        left={'50%'}
        transform={'translateX(-50%)'}
        className="context"
      >
        <HeadSectionLight
          title_h2={true}
          title={contact?.headsection?.title || 'Tuyển sinh'}
          subtitle="Contact"
          desc={contact?.headsection?.desc || 'Đại học năm 2023'}
        />
        <SimpleGrid columns={{ base: 1, lg: 5 }} gap={'24px'} pt={'24px'}>
          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <Box color={'white'}>
              <List
                spacing={'18px'}
                border={'1px solid'}
                borderColor={'gray.400'}
                p={{ base: '12px', md: '16px' }}
                rounded={'sm'}
              >
                {lists.map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon as={AiFillStar} w={'24px'} h={'24px'} color={'orange.400'} />
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <FormWrapper />
          </GridItem>
        </SimpleGrid>
      </Container>

      {/* Animate  */}
      <Box className={styles['area']} bg={'green.800'} w={'100%'}>
        <List className={styles['circles']}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </List>
      </Box>
    </Box>
  );
};
