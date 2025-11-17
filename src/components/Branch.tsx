import {
  Box,
  Container,
  GridItem,
  Heading,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from '@chakra-ui/react';
import Image from 'next/image';

interface IBranch {
  name: string;
  overview: string[];
  'kien-thuc': string[];
  'ky-nang': string[];
  'image-overview': string;
  'image-kien-thuc': string;
  'thai-do'?: string[];
}

export const Branch = (props: IBranch) => {
  return (
    <Container maxW={'6xl'} fontWeight={500}>
      <Box as={'section'} py={'48px'}>
        <Heading as={'h2'} pb={'24px'} textAlign={'center'}>
          Tổng quan chương trình
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={'8'}>
          <GridItem>
            <Image
              loading="lazy"
              src={props['image-overview']}
              alt={props.name}
              width={600}
              height={500}
              quality={70}
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ width: '100%', height: 'auto' }}
            />
          </GridItem>
          <GridItem>
            <UnorderedList spacing={'4'}>
              {props['overview'].map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </UnorderedList>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box as={'section'} py={'48px'}>
        <Heading as={'h2'} pb={'24px'} textAlign={'center'}>
          Kiến thức và kỹ năng nhận được
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={'8'}>
          <GridItem>
            <Box pb={'32px'}>
              <Heading as={'h3'} pb={'16px'} size={'md'}>
                Kiến thức
              </Heading>
              <UnorderedList spacing={'4'}>
                {props['kien-thuc'].map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box pb={'32px'}>
              <Heading as={'h3'} pb={'16px'} size={'md'}>
                Kỹ năng
              </Heading>
              <UnorderedList spacing={'4'}>
                {props['ky-nang'].map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            {props['thai-do'] && (
              <Box>
                <Heading as={'h3'} pb={'16px'} size={'md'}>
                  Thái độ và phẩm chất đạo đức
                </Heading>
                <UnorderedList spacing={'4'}>
                  {props['thai-do']?.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            )}
          </GridItem>
          <GridItem>
            <Image
              loading="lazy"
              src={props['image-kien-thuc']}
              alt={props.name}
              width={600}
              height={500}
              quality={70}
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ width: '100%', height: 'auto' }}
            />
          </GridItem>
        </SimpleGrid>
      </Box>
    </Container>
  );
};
