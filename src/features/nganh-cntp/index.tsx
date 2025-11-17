'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface CntpProps {
  cntp: {
    title: string;
    overview: {
      image: string;
      list_overview: {
        overview_1: string;
        overview_2: string;
      };
    };
    skill: {
      list_overview: {
        overview_1: {
          list_1: string;
          list_2: string;
        };
        overview_2: {
          list_1: string;
          list_2: string;
          list_3: string;
        };
        overview_3: string;
      };
      image: string;
    };
  };
}

export const Cntp = ({ cntp }: CntpProps) => {
  return (
    <LayoutNganh title={cntp?.title || 'Ngành Công Nghệ Thực Phẩm'}>
      <Branch
        name={cntp?.title || 'Công nghệ thực phẩm'}
        overview={[
          cntp?.overview?.list_overview?.overview_1 ||
            'Là ngành đào tạo về Công nghệ Thực phẩm đầu tiên của miền Bắc đạt chứng nhận kiểm định AUN-QA (ASEAN University Network – Quality Assurance)',
          cntp?.overview?.list_overview?.overview_2 ||
            'Ngành Công nghệ thực phẩm Đào tạo trình độ Kỹ sư theo định hướng chất lượng cao trong lĩnh vực Công nghệ Thực phẩm. Kỹ sư Công nghệ Thực phẩm được đào tạo có đạo đức nghề nghiệp, kiến thức chuyên môn toàn diện. Nắm vững các nguyên tắc và quy luật của tự nhiên-xã hội, có kỹ năng thực hành, khả năng làm việc độc lập, sáng tạo và giải quyết vấn đề trong ngành Thực phẩm, có năng lực hội nhập và làm việc trong môi trường quốc tế.',
        ]}
        kien-thuc={[
          cntp?.skill?.list_overview?.overview_1?.list_1 ||
            'Có kiến thức về khoa học tự nhiên, xã hội, thể thao, văn hoá, chính trị, an ninh, quốc phòng',
          cntp?.skill?.list_overview?.overview_1?.list_2 ||
            'Có kiến thức chuyên môn cơ bản, kỹ thuật cốt lõi về Công nghệ Thực phẩm',
        ]}
        ky-nang={[
          cntp?.skill?.list_overview?.overview_2?.list_1 ||
            'Kỹ năng thực hành, vận hành dây chuyền, thiết bị sản xuất trong lĩnh vực thực phẩm',
          cntp?.skill?.list_overview?.overview_2?.list_2 ||
            'Kỹ năng nghiên cứu khoa học, nghiên cứu phát triển sản phẩm thực phẩm và kỹ năng khởi nghiệp',
          cntp?.skill?.list_overview?.overview_2?.list_3 ||
            'Kỹ năng làm việc trong môi trường đa truyền thông, đa văn hoá – toàn cầu hoá, và kỹ năng tự học suốt đời',
        ]}
        thai-do={[
          cntp?.skill?.list_overview?.overview_3 ||
            'Có thái độ tích cực, có đạo đức nghề nghiệp, chủ động, sáng tạo trong công việc.',
        ]}
        image-kien-thuc={cntp?.skill?.image || '/common.jpg'}
        image-overview={cntp?.overview?.image || '/cntp.jpg'}
      />
    </LayoutNganh>
  );
};
