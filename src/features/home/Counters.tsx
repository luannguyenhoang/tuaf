'use client';

import styles from '@/styles/Couters.module.css';
import { Box, Container, Flex, Heading, List, ListItem, SimpleGrid } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import CountUp from 'react-countup';

const HeadSectionLight = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSectionLight)
);

interface ICounter {
  start: number;
  end: number;
  subfix: string;
  prefix?: string;
}

interface Support {
  title: number;
  desc: string;
}
interface HeadSectionData {
  title: string;
  desc: string;
}
interface Listsgroup {
  group_1: Support;
  group_2: Support;
  group_3: Support;
  group_4: Support;
}
interface CounterProps {
  counter: {
    headsection: HeadSectionData;
    group: Listsgroup;
  };
}

export const Counter = (props: ICounter) => {
  const { start, end, subfix, prefix } = props;
  return (
    <CountUp
      enableScrollSpy={true}
      start={start}
      end={end}
      duration={2}
      suffix={prefix || '+'}
      onEnd={() => console.log('Ended! 👏')}
      onStart={() => console.log('Started! 💨')}
    >
      {({ countUpRef }) => (
        <Flex justifyContent={'center'} flexDir="column" align={'center'}>
          <span
            style={{
              fontSize: '2.5rem',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#fff',
            }}
            ref={countUpRef}
          />
          <Heading fontSize="lg" as={'h3'} color="red.500">
            {subfix}
          </Heading>
        </Flex>
      )}
    </CountUp>
  );
};

export const Counters = ({ counter }: CounterProps) => {
  const counters = [
    {
      start: 0,
      end: counter?.group?.group_1?.title || 8,
      suffix: counter?.group?.group_1?.desc || 'Ngành học trực tuyến',
      prefix: ' ',
    },
    {
      start: 0,
      end: counter?.group?.group_2?.title || 2000,
      suffix: counter?.group?.group_2?.desc || 'Khóa học',
    },
    {
      start: 0,
      end: counter?.group?.group_3?.title || 10000,
      suffix: counter?.group?.group_3?.desc || 'Sinh viên theo học',
    },
    {
      start: 0,
      end: counter?.group?.group_4?.title || 96,
      suffix: counter?.group?.group_4?.desc || 'Học viên có việc làm',
      prefix: '%',
    },
  ];
  return (
    <Box pos={'relative'} zIndex={0}>
      <Container
        maxW="6xl"
        py={'48px'}
        className={styles['context']}
        pos={'absolute'}
        top={0}
        left={'50%'}
        transform={'translateX(-50%)'}
      >
        <HeadSectionLight
          title_h2={true}
          title={counter?.headsection?.title || 'Những con số ấn tượng'}
          subtitle="numbers"
          desc={
            counter?.headsection?.desc ||
            'Cùng xem những con số ấn tượng của chúng tôi trong suốt thời gian vừa qua'
          }
        />
        <SimpleGrid
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          spacing={'8'}
          pt={'36px'}
        >
          {counters.map((counter, index) => (
            <Counter
              key={index}
              start={counter.start}
              end={counter.end}
              subfix={counter.suffix}
              prefix={counter.prefix}
            />
          ))}
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
