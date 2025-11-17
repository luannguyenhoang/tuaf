import { fetchAuth } from '@/utils/fetchAuth';
import { fetchSeo } from '@/utils/seo';
import { replaceSeoRM } from '@/utils/seoRankMath';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { Loading } from '@/components/Loading';

const CntpTa = dynamic(() => import('@/features/nganh-cntpta').then((mod) => mod.CntpTa), {
  loading: () => <Loading />,
});
const SeoMeta = dynamic(() => import('@/components/SeoMeta'));

async function getData() {
  const type = 'cntpta';
  const api_url = process.env.API_URL || '';
  const api_rm_url = process.env.API_RMS_URL || '';
  const api_url_seo = `${api_rm_url}/nganh-cong-nghe-thuc-pham-chuong-trinh-tieng-anh`;

  try {
    const [reseo, res] = await Promise.all([
      fetchSeo({ url: api_url_seo, revalidate: 3600 }),
      fetchAuth({
        url: `${api_url}/${type}`,
        revalidate: 3600,
      }),
    ]);

    if (!reseo.ok || !res.ok) {
      throw new Error('Failed to fetch data');
    }

    const [head, data] = await Promise.all([reseo.json(), res.json()]);
    const home_content = data ? data[0] : null;

    return {
      head: head?.head || null,
      home_content,
    };
  } catch (error) {
    console.log(error);
    return {
      head: null,
      home_content: null,
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { head } = await getData();
  if (!head) {
    return {};
  }

  const seoHtml = replaceSeoRM(head);
  const ogTitleMatch = seoHtml.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/);
  const title = ogTitleMatch ? ogTitleMatch[1] : 'Ngành công nghệ thực phẩm chương trình tiếng Anh';

  return {
    title,
  };
}

export default async function Page() {
  const { head, home_content } = await getData();
  const seoHtml = head ? replaceSeoRM(head) : null;

  return (
    <>
      {seoHtml && <SeoMeta seoHtml={seoHtml} />}
      <CntpTa cntpta={home_content?.acf?.cntpta} />
    </>
  );
}
