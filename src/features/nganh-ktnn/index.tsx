'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface KtnnProps {
  ktnn: {
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

export const Ktnn = ({ ktnn }: KtnnProps) => {
  return (
    <LayoutNganh title={ktnn?.title || 'Ngành kinh tế nông nghiệp'}>
      <Branch
        name={ktnn?.title || 'Kinh tế nông nghiệp'}
        overview={[
          ktnn?.overview?.list_overview?.overview_1 ||
            'Ngành Kinh tế nông nghiệp (Agricultural Economics) là một ngành học chuyên đào tạo về các hoạt động kinh tế, tài chính và thương mại trong nông nghiệp, nhằm mục đích khai thác và sử dụng các nguồn lực trong nông nghiệp một cách hiệu quả để góp phần phát triển nền kinh tế nông nghiệp nói riêng và nền kinh tế của cả nước nói chung.',
          ktnn?.overview?.list_overview?.overview_2 ||
            'Ngành Kinh tế nông nghiệp sẽ lấy nông nghiệp làm gốc, sau đó phát triển và ứng dụng các phương thức kỹ thuật, công nghệ hiện đại để tạo điều kiện cho nền kinh tế nông nghiệp phát triển thuận lợi.',
        ]}
        kien-thuc={[
          ktnn?.skill?.list_overview?.overview_1?.list_1 ||
            'Theo học ngành Kinh tế nông nghiệp tại TUAF, sinh viên sẽ được trang bị hệ thống kiến thức cơ bản về kinh tế xã hội, quản lý và quản trị kinh doanh; kiến thức chuyên sâu về kinh tế nông nghiệp và quản trị kinh doanh nông nghiệp;',
          ktnn?.skill?.list_overview?.overview_1?.list_2 ||
            'Kiến thức về quản lý nông nghiệp nông thôn; kiến thức về phát triển nông nghiệp, nông thôn trong điều kiện hội nhập kinh tế quốc tế và kinh tế thị trường.',
        ]}
        ky-nang={[
          ktnn?.skill?.list_overview?.overview_2?.list_1 ||
            'Sinh viên cũng sẽ được rèn luyện năng lực hoạch định, đánh giá, phân tích và giám sát thực hiện các chiến lược và chính sách phát triển nông nghiệp, nông thôn',
          ktnn?.skill?.list_overview?.overview_2?.list_2 ||
            'Kỹ năng tổ chức sản xuất – kinh doanh và phân tích thị trường các ngành hàng nông sản nhằm đáp ứng nhu cầu của thị trường; kỹ năng lập quy hoạch và xây dựng các dự án đầu tư phát triển nông nghiệp, nông thôn;…',
        ]}
        image-kien-thuc={ktnn?.skill?.image || '/common.jpg'}
        image-overview={ktnn?.overview?.image || '/ktnn.jpg'}
      />
    </LayoutNganh>
  );
};
