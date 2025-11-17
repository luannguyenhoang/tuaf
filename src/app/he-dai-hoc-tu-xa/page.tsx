import { Box, Image } from '@chakra-ui/react';
import { Metadata } from 'next';
import { fetchAuth } from '@/utils/fetchAuth';

async function getPostData() {
  const api_url = process.env.API_URL || '';
  try {
    const res = await fetchAuth({
      url: `${api_url}/landing/?slug=he-dai-hoc-tu-xa`,
      revalidate: 3600,
    });
    const posts = (await res.json()) || '';
    const post: any = posts ? posts[0] : null;
    return post || null;
  } catch (error) {
    console.error('Error in fetching slug', error);
    return null;
  }
}

export const metadata: Metadata = {
  title: 'Chương trình đào tạo từ xa Đại học Nông Lâm Thái Nguyên',
  description: 'Thông tin về hệ đại học từ xa',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Chương trình đào tạo từ xa Đại học Nông Lâm Thái Nguyên',
    url: 'https://tuaf.vn/he-dai-hoc-tu-xa',
    images: [
      {
        url: '/logo_ehou',
        width: 1200,
        height: 630,
        alt: 'Hệ đại học từ xa',
      },
    ],
  },
};

export default async function Page() {
  const post = await getPostData();

  return (
    <>
      {post?.acf?.landing ? (
        <div
          dangerouslySetInnerHTML={{
            __html: post?.acf?.landing,
          }}
        />
      ) : (
        <Box display={'flex'} justifyContent={'center'}>
          <Image src="/snapedit_1702603916913.png" alt="Dang-xay-dung" />
        </Box>
      )}
    </>
  );
}
