'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface QlddProps {
  qldd: {
    title: string;
    overview: {
      image: string;
      overview_1: string;
    };
    skill: {
      list_overview: {
        overview_1: {
          list_1: string;
          list_2: string;
          list_3: string;
          list_4: string;
          list_5: string;
          list_6: string;
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

export const Qldd = ({ qldd }: QlddProps) => {
  return (
    <LayoutNganh title={qldd?.title || 'Kinh doanh quản lý đất đai'}>
      <Branch
        name={qldd?.title || 'Quản lý đất đai'}
        overview={[
          qldd?.overview?.overview_1 ||
            'Ngành Quản lý đất đai là ngành đào tạo về công tác quản lý đất đai, lập hồ sơ địa chính phục vụ cấp giấy chứng nhận quyền sử dụng đất cho các tổ chức, hộ gia đình cá nhân. Mục tiêu của ngành này là đào tạo sinh viên có đủ phẩm chất đạo đức, văn hóa, năng lực chuyên môn để có thể quản lý được đất đai.',
        ]}
        kien-thuc={[
          qldd?.skill?.list_overview?.overview_1?.list_1 ||
            'Nắm vững kiến thức cơ bản về công nghệ địa chính, các nguyên tắc, quy trình, kế hoạch sử dụng đất',
          qldd?.skill?.list_overview?.overview_1?.list_2 ||
            'Hiểu được các quy định chính sách của nhà nước về quản lý đất đai cũng như các thủ tục hành chính liên quan.',
          qldd?.skill?.list_overview?.overview_1?.list_3 ||
            'Hiểu được những kiến thức cơ bản nhất về đầu tư, kinh doanh, có khả năng đo vẽ, chỉnh lý và thành lập nên các bản đồ trong chuyên ngành quản lý đất đai',
          qldd?.skill?.list_overview?.overview_1?.list_4 ||
            'Thực hiện đúng quy trình, thủ tục đăng ký đất đai, lập, cập nhật, chỉnh lý và quản lý hồ sơ địa chính',
          qldd?.skill?.list_overview?.overview_1?.list_5 ||
            'Có khả năng thống kê, kiểm kê đất đai các cấp; lập được phương án bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất.',
          qldd?.skill?.list_overview?.overview_1?.list_6 ||
            'Đánh giá được tiềm năng đất đai, hiện trạng sử dụng đất và xây dựng phương án quy hoạch, kế hoạch sử dụng đất, quy hoạch tổng thể phát triển kinh tế - xã hội, quy hoạch đô thị và khu dân cư.',
        ]}
        ky-nang={[
          qldd?.skill?.list_overview?.overview_2?.list_1 ||
            'Kỹ năng giao tiếp, thuyết trình, thuyết phục',
          qldd?.skill?.list_overview?.overview_2?.list_2 ||
            'Kỹ năng quản lý thời gian và sắp xếp công việc: báo cáo, tổng hợp, lên kế hoạch, deadline…',
        ]}
        image-kien-thuc={qldd?.skill?.image || '/common.jpg'}
        image-overview={qldd?.overview?.image || '/qldd.jpg'}
      />
    </LayoutNganh>
  );
};
