'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface KhmtProps {
  khmt: {
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
        overview_1: string;
        overview_2: {
          list_1: string;
          list_2: string;
        };
      };
      image: string;
    };
  };
}

export const Khmt = ({ khmt }: KhmtProps) => {
  return (
    <LayoutNganh title={khmt?.title || 'Ngành khoa học môi trường'}>
      <Branch
        name={khmt?.title || 'Ngành khoa học môi trường'}
        overview={[
          khmt?.overview?.list_overview?.overview_1 ||
            'Ngành Khoa học môi trường (Environmental Science) nghiên cứu mối quan hệ giữa con người và môi trường, bao gồm nguồn gốc và tương tác của các chất trong môi trường. ',
          khmt?.overview?.list_overview?.overview_2 ||
            'Là một sinh viên ngành Khoa học Môi trường, bạn sẽ có cơ hội tìm hiểu về các mối quan hệ phức tạp giữa con người với môi trường, cũng như sự đa dạng của các quy luật trong tự nhiên. Cụ thể hơn, khoa học môi trường có liên quan chặt chẽ với nghiên cứu hệ sinh thái, các hiện tượng tự nhiên xảy ra trên trái đất, cũng như các quá trình văn hóa, chính trị và xã hội tác động đến hành tinh của chúng ta. Với kiến thức trong lĩnh vực này, bạn không chỉ góp phần cải thiện các vấn đề môi trường mà còn nhiều khía cạnh khác của xã hội.',
        ]}
        kien-thuc={[
          khmt?.skill?.list_overview?.overview_1 ||
            'Sinh viên ngành Khoa học Môi trường sẽ học về nhiều lĩnh vực như quan trắc môi trường, quản lý môi trường, sinh thái học, hóa học môi trường, quản lý chất thải, quy hoạch sử dụng đất đai, và biến đổi khí hậu. Họ cũng sẽ có cơ hội thực hành trong phòng thí nghiệm và làm việc với nhiều loại thí nghiệm khác nhau để nắm vững kiến thức và kỹ năng trong lĩnh vực môi trường',
        ]}
        ky-nang={[
          khmt?.skill?.list_overview?.overview_2?.list_1 ||
            'Kỹ năng giao tiếp, thuyết trình, thuyết phục',
          khmt?.skill?.list_overview?.overview_2?.list_2 ||
            'Kỹ năng quản lý thời gian và sắp xếp công việc: báo cáo, tổng hợp, lên kế hoạch, deadline…',
        ]}
        image-kien-thuc={khmt?.skill?.image || '/common.jpg'}
        image-overview={khmt?.overview?.image || '/khmt.jpg'}
      />
    </LayoutNganh>
  );
};
