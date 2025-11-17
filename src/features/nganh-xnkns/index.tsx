'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface XnknsProps {
  xnkns: {
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
          list_3: string;
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

export const Xnkns = ({ xnkns }: XnknsProps) => {
  return (
    <LayoutNganh title={xnkns?.title || 'Ngành kinh doanh quốc tế'}>
      <Branch
        name={xnkns?.title || 'Kinh doanh quốc tế'}
        overview={[
          xnkns?.overview?.list_overview?.overview_1 ||
            'Xuất nhập khẩu là một trong những lĩnh vực kinh doanh hàng đầu đang được nhà nước ta ưu tiên đẩy mạnh. Đây là một lợi thế cực lớn đối với sinh viên XNK, mở rộng cơ hội việc làm với mức thu nhập khủng',
          xnkns?.overview?.list_overview?.overview_2 ||
            'Ngành Kinh doanh xuất nhập khẩu Nông Lâm sản yêu cầu các bên tuân thủ nghiêm ngặt các nguyên tắc quốc tế trong mua bán hàng hoá. Chính vì thế, XNK là ngành nghề có tính đặc thù cao',
        ]}
        kien-thuc={[
          xnkns?.skill?.list_overview?.overview_1?.list_1 ||
            'Học viên được những chuyên gia XNK giỏi đào tạo theo chương trình giàu tính thực tiễn, đa dạng về kinh nghiệm xử lý tình huống, có kiến thức tổng hợp chuyên ngành',
          xnkns?.skill?.list_overview?.overview_1?.list_2 ||
            'Nắm chắc và vận dụng linh hoạt kiến thức chuyên ngành xuất nhập khẩu Nông Lâm sản vào thực tế: Quy trình và chính sách xuất nhập khẩu, thủ tục hải quan trong xuất nhập khẩu, chứng từ xuất nhập khẩu, …',
          xnkns?.skill?.list_overview?.overview_1?.list_3 ||
            'Thành thạo kỹ năng phân tích và biết cách áp dụng các văn bản pháp luật hiện hành về XNK vào công việc.',
        ]}
        ky-nang={[
          xnkns?.skill?.list_overview?.overview_2?.list_1 ||
            'Kỹ năng giao tiếp, thuyết trình, thuyết phục',
          xnkns?.skill?.list_overview?.overview_2?.list_2 ||
            'Kỹ năng quản lý thời gian và sắp xếp công việc: báo cáo, tổng hợp, lên kế hoạch, deadline…',
        ]}
        image-kien-thuc={xnkns?.skill?.image || '/common.jpg'}
        image-overview={xnkns?.overview?.image || '/xnk.jpg'}
      />
    </LayoutNganh>
  );
};
