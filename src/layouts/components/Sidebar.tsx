'use client';

import { Box, Button, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiLogoTiktok } from 'react-icons/bi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const FormWrapper = dynamic(() =>
  import('@/components/FormWrapper').then((mod) => mod.FormWrapper)
);

export const Item = ({ path, image, title }: { path: string; image: string; title: string }) => {
  return (
    <Box
      as={Link}
      href={path || '/'}
      pos="relative"
      transition={'all ease .4s'}
      _hover={{ transform: 'translateY(-10px)' }}
    >
      <Image
        priority
        width={700}
        height={400}
        src={image}
        alt={title}
        quality={70}
        sizes="(max-width: 768px) 100vw, 700px"
        style={{ maxHeight: '150px', filter: 'brightness(50%)' }}
      />
      <Box
        as={Flex}
        pos={'absolute'}
        top={0}
        left={'10%'}
        right={'40%'}
        bottom={0}
        align={'center'}
      >
        <Heading as={'h3'} size={'md'} color={'white'} textAlign={'center'}>
          {title}
        </Heading>
      </Box>
    </Box>
  );
};

export const Sidebar = ({ sticky }: { sticky?: string }) => {
  const [home_content, setHomeContent] = useState<any>(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await fetch(`/api/content-page/?type=trang-chu`, {
          next: { revalidate: 3 },
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        setHomeContent(data?.posts[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getHomeContent();
  }, []);

  const categorys = home_content?.acf?.lists_categorys;
  const categotys = [
    {
      image: categorys?.lists_categorys_1?.categorys_1?.categorys_image || '/xnk.jpg',
      path: '/nganh-kinh-doanh-quoc-te',
      title:
        categorys?.lists_categorys_1?.categorys_1?.categorys_title ||
        'Ngành kinh doanh xuất nhập khẩu nông sản',
      desc:
        categorys?.lists_categorys_1?.categorys_1?.categorys_desc ||
        'Sinh viên được đào tạo ngành Kinh doanh quốc tế về chuyên môn kinh doanh xuất nhập khẩu nông lâm sản, giàu tính thực tiện, đa dạng về kinh nghiệm xử lý tình huống',
    },
    {
      image: categorys?.lists_categorys_1?.categorys_2?.categorys_image || '/cntp.jpg',
      path: '/nganh-cong-nghe-thuc-pham',
      title:
        categorys?.lists_categorys_1?.categorys_2?.categorys_title || 'Ngành công nghệ thực phẩm',
      desc:
        categorys?.lists_categorys_1?.categorys_2?.categorys_desc ||
        'Ngành Công nghệ thực phẩm Đào tạo trình độ Đại học theo định hướng chất lượng cao trong lĩnh vực bảo quản và chế biến nông sản',
    },
    {
      image: categorys?.lists_categorys_1?.categorys_3?.categorys_image || '/nncnc.jpg',
      path: '/nganh-nong-nghiep-cong-nghe-cao',
      title:
        categorys?.lists_categorys_1?.categorys_3?.categorys_title ||
        'Ngành nông nghiệp công nghệ cao',
      desc:
        categorys?.lists_categorys_1?.categorys_3?.categorys_desc ||
        'Ngành đào tạo theo định hướng chất lượng cao và liên ngành trong lĩnh vực sản xuất cây trồng nông nghiệp hiện đại',
    },
    {
      image: categorys?.lists_categorys_1?.categorys_4?.categorys_image || '/ta.jpg',
      path: 'nganh-cong-nghe-thuc-pham-chuong-trinh-tieng-anh',
      title:
        categorys?.lists_categorys_1?.categorys_4?.categorys_title ||
        'Ngành công nghệ thực phẩm Tiếng Anh',
      desc:
        categorys?.lists_categorys_1?.categorys_4?.categorys_desc ||
        'Ngoài kiến thức cơ sở và chuyên sâu về lĩnh vực Công nghệ Thực phẩm, sinh viên còn được tiếp cận chương trình tiên được đào tạo bằng tiếng Anh',
    },
    {
      image: categorys?.lists_categorys_2?.categorys_5?.categorys_image || '/qldd.jpg',
      path: '/nganh-quan-ly-dat-dai',
      title: categorys?.lists_categorys_2?.categorys_5?.categorys_title || 'Ngành quản lý đất đai',
      desc:
        categorys?.lists_categorys_2?.categorys_5?.categorys_desc ||
        'Ngành Quản lý đất đai là ngành đào tạo về công tác quản lý đất đai, lập hồ sơ địa chính phục vụ cấp giấy chứng nhận quyền sử dụng đất cho các tổ chức, hộ gia đình cá nhân',
    },
    {
      image: categorys?.lists_categorys_2?.categorys_6?.categorys_image || '/khmt.jpg',
      path: '/nganh-khoa-hoc-moi-truong',
      title:
        categorys?.lists_categorys_2?.categorys_6?.categorys_title || 'Ngành khoa học môi trường',
      desc:
        categorys?.lists_categorys_2?.categorys_6?.categorys_desc ||
        'Ngành Khoa học môi trường (Environmental Science) nghiên cứu mối quan hệ giữa con người và môi trường, bao gồm nguồn gốc và tương tác của các chất trong môi trường',
    },
    {
      image: categorys?.lists_categorys_2?.categorys_7?.categorys_image || '/ktnn.jpg',
      path: '/nganh-kinh-te-nong-nghiep',
      title:
        categorys?.lists_categorys_2?.categorys_7?.categorys_title || 'Ngành kinh tế nông nghiệp',
      desc:
        categorys?.lists_categorys_2?.categorys_7?.categorys_desc ||
        'Ngành Kinh tế nông nghiệp (Agricultural Economics) là một ngành học chuyên đào tạo về các hoạt động kinh tế, tài chính và thương mại trong nông nghiệp, nhằm mục đích khai thác và sử dụng các nguồn lực trong nông nghiệp',
    },
    {
      image: categorys?.lists_categorys_2?.categorys_8?.categorys_image || '/qltnvmt.jpg',
      path: '/nganh-quan-ly-tai-nguyen-va-moi-truong',
      title:
        categorys?.lists_categorys_2?.categorys_8?.categorys_title ||
        'Ngành quản lý tài nguyên và môi trường',
      desc:
        categorys?.lists_categorys_2?.categorys_8?.categorys_desc ||
        'Ngành Quản lý tài nguyên và môi trường là ngành học đào tạo sinh viên những kiến thức cơ bản về quản lý các loại tài nguyên và môi trường, có đủ phẩm chất và kỹ năng chuyên môn để sống và làm việc trong ngành tài nguyên, môi trường',
    },
    {
      image: categorys?.lists_categorys_3?.categorys_9?.categorys_image || '/bds.webp',
      path: '/nganh-bat-dong-san',
      title: categorys?.lists_categorys_3?.categorys_9?.categorys_title || 'Ngành bất động sản',
      desc: categorys?.lists_categorys_3?.categorys_9?.categorys_desc || 'Ngành bất động sản',
    },
    {
      image: categorys?.lists_categorys_3?.categorys_10?.categorys_image || '/cnsh.webp',
      path: '/nganh-cong-nghe-sinh-hoc',
      title:
        categorys?.lists_categorys_3?.categorys_10?.categorys_title || 'Ngành công nghệ sinh học',
      desc:
        categorys?.lists_categorys_3?.categorys_10?.categorys_desc || 'Ngành công nghệ sinh học',
    },
    {
      image: categorys?.lists_categorys_3?.categorys_11?.categorys_image || '/ty.webp',
      path: '/nganh-thu-y',
      title: categorys?.lists_categorys_3?.categorys_11?.categorys_title || 'Ngành thú y',
      desc: categorys?.lists_categorys_3?.categorys_11?.categorys_desc || 'Ngành thú y',
    },
  ];
  return (
    <Box pos={sticky ? 'sticky' : 'static'} top={sticky}>
      <Box>
        <Heading as={'h2'} size={'md'} pb={'20px'} textAlign={{ base: 'center', lg: 'start' }}>
          Đăng ký tư vấn
        </Heading>
        <FormWrapper />
      </Box>
      <Box pt={'32px'}>
        <Heading as={'h2'} size={'md'} pb={'20px'} textAlign={{ base: 'center', lg: 'start' }}>
          Các ngành đào tạo
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 1 }} gap={'20px'}>
          {categotys.map((cat, index) => (
            <Item key={index} path={cat.path} title={cat.title} image={`${cat.image}`} />
          ))}
        </SimpleGrid>
      </Box>

      <Box py={'32px'}>
        <Heading as={'h2'} size={'md'} pb={'20px'} textAlign={{ base: 'center', lg: 'start' }}>
          Mạng xã hội
        </Heading>
        <Box rounded={'sm'} p="24px" border={'1px solid'} borderColor={'gray.300'}>
          <VStack spacing={'16px'}>
            <Button
              prefetch={false}
              leftIcon={<FaFacebook />}
              colorScheme="blue"
              w={'full'}
              as={Link}
              href={'https://www.facebook.com/daihoctuxa.etuaf/'}
            >
              Fanpage
            </Button>
            <Button
              prefetch={false}
              leftIcon={<SiZalo />}
              colorScheme="blue"
              w={'full'}
              as={Link}
              href={'https://www.zalo.me/0941011771'}
            >
              Zalo hỗ trợ
            </Button>
            <Button
              prefetch={false}
              leftIcon={<BiLogoTiktok />}
              bg="blackAlpha.800"
              w={'full'}
              color={'whiteAlpha.800'}
              as={Link}
              href={'https://www.tiktok.com/@toiyeunongnghiep'}
              _hover={{ bg: 'blackAlpha.900' }}
            >
              Tiktok
            </Button>
            <VStack pt={'24px'} w={'full'}>
              <Text>Liên hệ trực tiếp</Text>
              <Button
                leftIcon={<BsFillTelephoneFill />}
                variant={'link'}
                color={'red.600'}
                w={'full'}
              >
                <Link prefetch={false} href="tel: 0941011771">
                  0941011771
                </Link>
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
