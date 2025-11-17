export type TMenus = {
  path: string;
  title: string;
  childs?: {
    path: string;
    title: string;
  }[];
}[];

export const menus = [
  {
    path: '/', // the url
    title: 'Trang chủ',
  },
  {
    path: '/gioi-thieu', // the url
    title: 'Giới thiệu',
  },

  {
    path: '#', // the url
    title: 'Ngành học',
    childs: [
      {
        path: '/nganh-bat-dong-san',
        title: 'Ngành bất động sản',
      },
      {
        path: '/nganh-cong-nghe-sinh-hoc',
        title: 'Ngành công nghệ sinh học',
      },
      {
        path: '/nganh-thu-y',
        title: 'Ngành thú y',
      },
      {
        path: '/nganh-kinh-doanh-quoc-te',
        title: 'Ngành kinh doanh quốc tế',
      },
      {
        path: '/nganh-cong-nghe-thuc-pham',
        title: 'Ngành công nghệ thực phẩm',
      },
      {
        path: '/nganh-nong-nghiep-cong-nghe-cao',
        title: 'Ngành nông nghiệp công nghệ cao',
      },
      {
        path: '/nganh-cong-nghe-thuc-pham-chuong-trinh-tieng-anh',
        title: 'Ngành công nghệ thực phẩm chuyên ngành tiếng Anh',
      },
      {
        path: '/nganh-quan-ly-dat-dai',
        title: 'Ngành quản lý đất đai',
      },
      {
        path: '/nganh-khoa-hoc-moi-truong',
        title: 'Ngành khoa học môi trường',
      },
      {
        path: '/nganh-kinh-te-nong-nghiep',
        title: 'Ngành kinh tế nông nghiệp',
      },
      {
        path: '/nganh-quan-ly-tai-nguyen-va-moi-truong',
        title: 'Ngành quản lý tài nguyên và môi trường',
      },
    ],
  },
  {
    path: '/lich-khai-giang', // the url
    title: 'Khai giảng',
  },
  {
    path: '/dang-ky', // the url
    title: 'Đăng ký',
  },
  {
    path: '/tin-tuc', // the url
    title: 'Tin tức', // view rendered
  },
  {
    path: '/hop-tac', // the url
    title: 'Hợp tác', // view rendered
  },
];
