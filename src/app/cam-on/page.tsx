import { Loading } from '@/components/Loading';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const DangkyTc = dynamic(
  () => import('@/features/dang-ky-thanh-cong').then((mod) => mod.DangkyTc),
  {
    loading: () => <Loading />,
  }
);

export const metadata: Metadata = {
  title: 'Đăng ký tư vấn từ xa Trường Đại học Nông lâm Thái Nguyên',
  description:
    'Đăng ký tư vấn Đại học từ xa Trường Đại học Nông lâm Thái Nguyên, tiết kiệm chi phí và thời gian',
};

export default function Page() {
  return <DangkyTc />;
}
