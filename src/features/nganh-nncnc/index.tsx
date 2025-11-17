'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface NncncProps {
  nncnc: {
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

export const Nncnc = ({ nncnc }: NncncProps) => {
  return (
    <LayoutNganh title={nncnc?.title || 'Ngành nông nghiệp công nghệ cao'}>
      <Branch
        name={nncnc?.title || 'Ngành nông nghiệp công nghệ cao'}
        overview={[
          nncnc?.overview?.list_overview?.overview_1 ||
            'Ngành đào tạo có sự hợp tác của 03 trường đại học: Đại học Nông lâm Thái Nguyên, Trường Đại học Kỹ thuật Công nghiệp, Trường Đại học Công nghệ Thông tin và Truyền thông và các đơn vị khác trong và ngoài nước.',
          nncnc?.overview?.list_overview?.overview_2 ||
            'Ngành đào tạo Kỹ sư theo định hướng chất lượng cao và liên ngành trong lĩnh vực sản xuất cây trồng nông nghiệp hiện đại. Kỹ sư NNCNC có đạo đức nghề nghiệp, kiến thức chuyên môn toàn diện, kỹ năng nghề nghiệp tốt trong lĩnh vực sản xuất cây trồng ứng dụng công nghệ cao, có năng lực tự khởi nghiệp, hội nhập và làm việc trong môi trường quốc tế.',
        ]}
        kien-thuc={[
          nncnc?.skill?.list_overview?.overview_1?.list_1 ||
            'Có kiến thức về khoa học tự nhiên, xã hội, thể thao, văn hoá, chính trị, an ninh, quốc phòng',
          nncnc?.skill?.list_overview?.overview_1?.list_2 ||
            'Có kiến thức chuyên môn liên ngành: Khoa học cây trồng, công nghệ sinh học, tự động hóa, công nghệ thông tin, công nghệ sau thu hoạch, kinh doanh và phát triển thị trường nông sản.. nhằm ứng dụng và phát triển công nghệ tiên tiến vào sản xuất cây trồng nông nghiệp',
        ]}
        ky-nang={[
          nncnc?.skill?.list_overview?.overview_2?.list_1 ||
            'Thành thạo các kỹ năng trong quy trình kỹ thuật canh tác, vận hành hệ thống sản xuất cây trồng nông nghiệp ứng dụng CNC.',
          nncnc?.skill?.list_overview?.overview_2?.list_2 ||
            'Triển khai nghiên cứu khoa học, ứng dụng và chuyển giao tiến bộ kỹ thuật trong sản xuất cây trồng nông nghiệp hiện đại',
          nncnc?.skill?.list_overview?.overview_2?.list_3 ||
            'Vận dụng kỹ năng mềm, sử dụng các phương tiện truyền thông trong quản lý và sản xuất cây trồng công nghệ cao và có kỹ năng tự học suốt đời.',
        ]}
        thai-do={[
          nncnc?.skill?.list_overview?.overview_3 ||
            'Định hướng nghề nghiệp rõ ràng, chủ động trong công việc, ý thức học tập suốt đời và tuân thủ các quy định pháp luật và đạo đức nghề nghiệp.',
        ]}
        image-kien-thuc={nncnc?.skill?.image || '/common.jpg'}
        image-overview={nncnc?.overview?.image || '/nncnc.jpg'}
      />
    </LayoutNganh>
  );
};
