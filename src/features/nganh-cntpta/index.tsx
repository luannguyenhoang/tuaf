'use client';

import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

interface CntptaProps {
  cntpta: {
    title: string;
    overview: {
      image: string;
      list_overview: {
        overview_1: string;
        overview_2: string;
        overview_3: string;
      };
    };
    skill: {
      list_overview: {
        overview_1: {
          list_1: string;
          list_2: string;
          list_3: string;
          list_4: string;
          list_5: string;
        };
        overview_2: {
          list_1: string;
          list_2: string;
          list_3: string;
          list_4: string;
          list_5: string;
          list_6: string;
          list_7: string;
          list_8: string;
          list_9: string;
          list_10: string;
          list_11: string;
        };
      };
      image: string;
    };
  };
}

export const CntpTa = ({ cntpta }: CntptaProps) => {
  return (
    <LayoutNganh title={cntpta?.title || 'Ngành Công Nghệ Thực Phẩm Chương Trình Tiếng Anh'}>
      <Branch
        name={cntpta?.title || 'Ngành công nghệ thực phẩm chuyên ngành Tiếng Anh'}
        overview={[
          cntpta?.overview?.list_overview?.overview_1 ||
            'Ngành Công nghệ Thực phẩm cung cấp kiến thức cơ sở và chuyên sâu về lĩnh vực Công nghệ Thực phẩm giúp sinh viên có khả năng tổ chức, lập kế hoạch sản xuất, quản lý sản xuất và phụ trách về kỹ thuật, công nghệ trong các nhà máy chế biến thực phẩm; phân tích và đánh giá chỉ tiêu hóa lý, vi sinh, hóa sinh của các sản phẩm thực phẩm; xây dựng bố trí các mô hình thí nghiệm, kiểm định vệ sinh an toàn thực phẩm; có kiến thức về phương pháp nghiên cứu, lập dự án, quản lý và điều hành các dự án liên quan đến lĩnh vực Công nghệ Thực phẩm',
          cntpta?.overview?.list_overview?.overview_2 ||
            'Ngoài ra, sinh viên tốt nghiệp từ Chương trình tiên tiến còn có năng lực tiếng Anh vượt trội do chương trình học được giảng dạy hoàn toàn bằng tiếng Anh; Có cơ hội học tập trong môi trường quốc tế với sinh viên đến từ các quốc gia như: Úc, Pháp, Hàn Quốc, Philippines, Indonesia…',
          cntpta?.overview?.list_overview?.overview_3 ||
            'Đội ngũ giáo viên giảng dạy Chương trình tiên tiến ngành Công nghệ Thực phẩm đều được đào tạo Thạc sĩ, Tiến sĩ ở nước ngoài, có chuyên môn và ngoại ngữ tốt. Khoảng 30 % số giảng viên tham gia đào tạo trong chương trình Công nghệ Thực phẩm là các Giáo sư, Tiến sĩ đến từ các trường đại học trên thế giới như Mỹ, Úc, Nhật Bản, Đài Loan',
        ]}
        kien-thuc={[
          cntpta?.skill?.list_overview?.overview_1?.list_1 ||
            'Biết được những kiến thức khoa học tự nhiên và xã hội áp dụng vào lĩnh vực công nghệ thực phẩm',
          cntpta?.skill?.list_overview?.overview_1?.list_2 ||
            'Hiểu những kiến thức chuyên môn như: Công nghệ sản xuất đồ hộp thực phẩm; Bảo quản và chế biến rau, quả; Sản xuất nước giải khát; Chế biến thịt, cá; Công nghệ chế biến trứng, sữa; Sản xuất đường, bánh, kẹo, …',
          cntpta?.skill?.list_overview?.overview_1?.list_3 ||
            'Có kiến thức về trang thiết bị, hệ thống và quy trình công nghệ thực phẩm',
          cntpta?.skill?.list_overview?.overview_1?.list_4 ||
            'Hiểu luật thực phẩm, quy trình quản lý chất lượng thực phẩm, các hệ thống quản lý chất lượng thực phẩm.',
          cntpta?.skill?.list_overview?.overview_1?.list_5 ||
            'Biết phương pháp nghiên cứu khoa học trong lĩnh vực thực phẩm.',
        ]}
        ky-nang={[
          cntpta?.skill?.list_overview?.overview_2?.list_1 ||
            'Vận dụng được các kiến thức đại cương, cơ sở và chuyên ngành công nghệ thực phẩm để làm việc.',
          cntpta?.skill?.list_overview?.overview_2?.list_2 ||
            'Vận dụng được kiến thức ngành để tìm hiểu, đánh giá và vận hành hệ thống quy trình công nghệ, thiết bị kỹ thuật trong chế biến thực phẩm',
          cntpta?.skill?.list_overview?.overview_2?.list_3 ||
            'Tổ chức, quản lý sản xuất, chế biến thực phẩm trong các cơ sở chế biến, doanh nghiệp',
          cntpta?.skill?.list_overview?.overview_2?.list_4 ||
            'Phân tích, đánh giá, kiểm soát các chỉ tiêu đảm bảo chất lượng, an toàn – vệ sinh thực phẩm',
          cntpta?.skill?.list_overview?.overview_2?.list_5 ||
            'Hình thành ý tưởng, nghiên cứu và phát triển sản phẩm mới',
          cntpta?.skill?.list_overview?.overview_2?.list_6 ||
            'Thiết kế và thực hiện các quy trình công nghệ theo yêu cầu',
          cntpta?.skill?.list_overview?.overview_2?.list_7 ||
            'Thích ứng và đảm nhiệm được công tác quản lý, điều hành các công việc thuộc lĩnh vực công nghệ thực phẩm',
          cntpta?.skill?.list_overview?.overview_2?.list_8 ||
            'Có khả năng tự học, tự nghiên cứu đáp ứng nhu cầu học tập suốt đời',
          cntpta?.skill?.list_overview?.overview_2?.list_9 ||
            'Đạt được chứng chỉ kỹ năng thực hành nghề 3/5',
          cntpta?.skill?.list_overview?.overview_2?.list_10 ||
            'Ngoại ngữ, tin học: Sinh viên tốt nghiệp có thể sử dụng thành thạo tiếng Anh trong giao tiếp và làm việc chuyên môn liên quan đến chuyên ngành kinh tế nông nghiệp. Sinh viên tốt nghiệp có thể sử dụng tiếng anh trong trình bày các tình huống chuyên môn thông thường, trong viết báo cáo chuyên môn. Trình độ tiếng Anh đạt tối thiểu IELTS 5.5 sau khóa học',
          cntpta?.skill?.list_overview?.overview_2?.list_11 ||
            'Sinh viên tốt nghiệp có thể sử dụng thành thạo các phần mềm tin học văn phòng (word, excel, powerpoint), sử dụng được ít nhất một trong các phần mềm tin học ứng dụng trong thống kê kinh tế-xã hội như SPSS, R, stata…. Sinh viên tốt nghiệp đạt chứng chỉ tin học quốc tế IC3 hoặc các chứng chỉ tin học khác có giá trị tương đương',
        ]}
        image-overview={cntpta?.overview?.image || '/ta.jpg'}
        image-kien-thuc={cntpta?.skill?.image || '/common.jpg'}
      />
    </LayoutNganh>
  );
};
