'use client';

import {
  Box,
  Circle,
  Container,
  GridItem,
  HStack,
  Heading,
  Icon,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdMap, MdOutlineMailOutline, MdPhone } from 'react-icons/md';

const FormWrapper = dynamic(() =>
  import('@/components/FormWrapper').then((mod) => mod.FormWrapper)
);

export const Dangky = () => {
  const [page_content, setPageContent] = useState<any>(null);

  useEffect(() => {
    const getPageContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=dang-ky`, {
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

  return (
    <>
      <Box bg="radial-gradient(circle, rgb(5 89 8) 2%, rgb(98 245 124) 100%, rgba(252,89,52,1) 100%)">
        <Container maxW={'6xl'} py="62px">
          <Heading as="h1" textAlign={'center'} size={'lg'} pb="16px" color={'white'}>
            {page_content?.acf?.title || 'Đăng ký học hệ từ xa Trường Đại học Nông lâm Thái Nguyên'}
          </Heading>
        </Container>
      </Box>
      <Box bg={'linear-gradient(180deg, rgba(255, 255, 255, 1), #dbfed6 100%)'}>
        <Container maxW={'6xl'} py="120px">
          <SimpleGrid columns={{ base: 1, md: 2 }} bg={'green.800'} py={'24px'} px={'24px'}>
            <GridItem color={'white'}>
              <Heading as={'h2'} size={{ base: 'md', lg: 'lg' }} pb={'16px'}>
                {page_content?.acf?.section?.title || 'Thông tin liên hệ'}
              </Heading>
              <VStack align={'start'} fontWeight={500} spacing={'16px'}>
                <HStack>
                  <VStack align={'start'}>
                    <HStack>
                      <Circle p={'8px'} bg={'red.400'}>
                        <Icon as={MdMap} color={'white'} />
                      </Circle>
                      <VStack align={'start'}>
                        <Heading as={'h3'} size={'sm'}>
                          {page_content?.acf?.section?.name ||
                            'TRƯỜNG ĐẠI HỌC NÔNG LÂM THÁI NGUYÊN'}
                        </Heading>
                      </VStack>
                    </HStack>
                    <UnorderedList>
                      <ListItem ml={'38px'} fontSize={'sm'}>
                        {page_content?.acf?.section?.address ||
                          'Địa chỉ: Tổ 10, Xã Quyết Thắng, TP Thái Nguyên, Thái Nguyên'}
                      </ListItem>
                    </UnorderedList>
                    <HStack>
                      <Circle p={'8px'} bg={'red.400'}>
                        <Icon as={MdMap} color={'white'} />
                      </Circle>
                      <Text>
                        {page_content?.acf?.section?.office_title || 'Văn phòng tuyển sinh:'}
                      </Text>
                    </HStack>
                    <UnorderedList>
                      <ListItem ml={'38px'} fontSize={'sm'}>
                        {page_content?.acf?.section?.address_1 ||
                          'Hà Nội: Số 116 Trần Vĩ, Phường Mai Dịch, Quận Cầu Giấy, Thành Phố Hà Nội'}
                      </ListItem>
                      <ListItem ml={'38px'} fontSize={'sm'}>
                        {page_content?.acf?.section?.address_2 ||
                          'Hồ Chí Minh: Số 91 Ký Con, phường Nguyễn Thái Bình, Quận 1, TP Hồ Chí Minh'}
                      </ListItem>
                      <ListItem ml={'38px'} fontSize={'sm'}>
                        {page_content?.acf?.section?.address_3 ||
                          'Đà Nẵng: Số 101B Lê Hữu Trác, Phước Mỹ, Sơn Trà, Đà Nẵng'}
                      </ListItem>
                      <ListItem ml={'38px'} fontSize={'sm'}>
                        {page_content?.acf?.section?.address_4 ||
                          'Nhật Bản: Số 1 Chome-3-2 Kagamiyama, Higashihiroshima, Hiroshima 739-0046'}
                      </ListItem>
                    </UnorderedList>
                  </VStack>
                </HStack>
                <HStack>
                  <Circle p={'8px'} bg={'red.400'}>
                    <Icon as={MdOutlineMailOutline} color={'white'} />
                  </Circle>
                  <Link href={`mailto:${page_content?.acf?.section?.email || 'tuaf@gvcn.vn'}`}>
                    Email:
                    {page_content?.acf?.section?.email || 'tuaf@gvcn.vn.'}
                  </Link>
                </HStack>
                <HStack>
                  <Circle p={'8px'} bg={'red.400'}>
                    <Icon as={MdPhone} color={'white'} />
                  </Circle>
                  <Link href={`tel:${page_content?.acf?.section?.phone || '0941011771'}`}>
                    Hotline:
                    {page_content?.acf?.section?.phone || '0941011771.'}
                  </Link>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem mt={{ lg: '0', md: '0', base: '30px' }}>
              <FormWrapper />
            </GridItem>
          </SimpleGrid>
        </Container>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7609480745314!2d105.77113527669943!3d21.04224898731216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454c918a64e17%3A0x6a26c7ecd7ef4df2!2zMTE2IFAuIFRy4bqnbiBW4bu5LCBNYWkgROG7i2NoLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1695417775713!5m2!1sen!2s"
          width="100%"
          height="500"
          style={{ border: 'none' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </>
  );
};
