'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface QltntnProps {
  qltntn: {
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
        };
      };
      image: string;
    };
  };
}

export const Qltntn = ({ qltntn }: QltntnProps) => {
  return (
    <LayoutNganh title={qltntn?.title || 'Ngành quản lý tài nguyên thiên nhiên và môi trường'}>
      <Branch
        name={qltntn?.title || 'Quản lý tài nguyên thiên nhiên và môi trường'}
        overview={[
          qltntn?.overview?.list_overview?.overview_1 ||
            'Ngành Quản lý tài nguyên và môi trường là ngành học đào tạo sinh viên những kiến thức cơ bản về quản lý các loại tài nguyên và môi trường, có đủ phẩm chất và kỹ năng chuyên môn để sống và làm việc trong ngành tài nguyên, môi trường',
          qltntn?.overview?.list_overview?.overview_2 ||
            'Quản lý được tình hình tài nguyên, môi trường khu vực mình làm; có kiến thức cơ bản về sinh học, khoa học tự nhiên và xã hội để giải quyết các vấn đề chung trong quản lý tài nguyên và môi trường',
        ]}
        kien-thuc={[
          qltntn?.skill?.list_overview?.overview_1?.list_1 ||
            'Chương trình đào tạo ngành Quản lý tài nguyên và môi trường trang bị cho sinh viên những kiến thức chuyên sâu về các tài nguyên thiên nhiên như;khoáng sản và năng lượng, đất, nước, không khí, rừng, đa dạng sinh học… ',
          qltntn?.skill?.list_overview?.overview_1?.list_2 ||
            'Học về quản lý ô nhiễm môi trường, quy hoạch môi trường, luật và chính sách tài nguyên môi trường, đánh giá tác động môi trường, công nghệ xử lý chất thải.Cơ hội việc làm đối với sinh viên Quản lý tài nguyên và môi trường là vô cùng rộng lớn. Bạn có thể làm ở nhiều vị trí khác nhau, mang lại nguồn thu nhập ổn như: Sở tài nguyên và môi trường, sở Khoa học và công nghệ, sở Nông nghiệp…',
        ]}
        ky-nang={[
          qltntn?.skill?.list_overview?.overview_2?.list_1 ||
            'Kỹ năng giao tiếp, thuyết trình, thuyết phục',
          qltntn?.skill?.list_overview?.overview_2?.list_2 ||
            'Kỹ năng quản lý thời gian và sắp xếp công việc: báo cáo, tổng hợp, lên kế hoạch, deadline…',
        ]}
        image-kien-thuc={qltntn?.skill?.image || '/common.jpg'}
        image-overview={qltntn?.overview?.image || '/qltnvmt.jpg'}
      />
    </LayoutNganh>
  );
};
