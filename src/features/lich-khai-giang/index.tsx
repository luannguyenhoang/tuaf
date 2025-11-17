'use client';

import { Loading } from '@/components/Loading';
import { useModal } from '@/components/ModalContext';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Frame = dynamic(() => import('@/components/Frame').then((mod) => mod.Frame));
const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));

export const LichKg = ({
  list,
  page_content,
  isLoading,
}: {
  list: string[];
  page_content: any;
  isLoading: boolean;
}) => {
  const { onOpen } = useModal();
  return (
    <>
      <LayoutNganh
        title={
          page_content?.acf?.title ||
          'Lịch khai giảng hệ đào tạo từ xa Trường Đại Học Nông Lâm Thái Nguyên'
        }
      >
        {!isLoading && (
          <Box py={'48px'}>
            <Frame
              title1={page_content?.acf?.section_1?.title || 'Cập nhật lịch khai giảng dự kiến'}
              list1={list}
              label="Đăng ký tư vấn"
              onClick={onOpen}
            />
          </Box>
        )}

        {isLoading && <Loading he="10vh" />}
      </LayoutNganh>
    </>
  );
};
