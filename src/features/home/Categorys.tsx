'use client';

import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const HeadSection = dynamic(() =>
  import('@/components/HeadSection').then((mod) => mod.HeadSection)
);
const CardCat = dynamic(() => import('@/components/CardCat').then((mod) => mod.CardCat));

interface Category {
  categorys_image: string;
  categorys_title: string;
  categorys_desc: string;
}

interface HeadSectionData {
  headsection_title: string;
  headsection_desc: string;
}

interface ListsCategorys1 {
  categorys_1: Category;
  categorys_2: Category;
  categorys_3: Category;
  categorys_4: Category;
}
interface ListsCategorys2 {
  categorys_5: Category;
  categorys_6: Category;
  categorys_7: Category;
  categorys_8: Category;
}
interface ListsCategorys3 {
  categorys_9: Category;
  categorys_10: Category;
  categorys_11: Category;
}
interface CategorysProps {
  categorys: {
    headsection: HeadSectionData;
    lists_categorys_1: ListsCategorys1;
    lists_categorys_2: ListsCategorys2;
    lists_categorys_3: ListsCategorys3;
  };
}

export const Categorys = ({ categorys }: CategorysProps) => {
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
    <Box py={'48px'}>
      <Container maxW="6xl">
        <HeadSection
          title={categorys?.headsection?.headsection_title || 'Chuyên ngành đào tạo'}
          title_h2={true}
          subtitle="major"
          desc={
            categorys?.headsection?.headsection_desc ||
            'Đào tạo đa ngành, chương trình học tiết kiệm thời gian'
          }
        />
        <SimpleGrid spacing={'8'} columns={{ base: 1, md: 2, lg: 4 }}>
          {categotys.map((categoty, index) => (
            <CardCat
              key={index}
              desc={categoty.desc}
              path={categoty.path}
              title={categoty.title}
              image={categoty.image}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
