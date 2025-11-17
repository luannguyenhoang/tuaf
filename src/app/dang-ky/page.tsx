import { fetchSeo } from '@/utils/seo';
import { replaceSeoRM } from '@/utils/seoRankMath';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { Loading } from '@/components/Loading';

const Dangky = dynamic(() => import('@/features/dang-ky').then((mod) => mod.Dangky), {
  loading: () => <Loading />,
});
const SeoMeta = dynamic(() => import('@/components/SeoMeta'));

async function getSeoData() {
  const api_rm_url = process.env.API_RMS_URL || '';
  const api_url_seo = `${api_rm_url}/dang-ky`;

  try {
    const reseo = await fetchSeo({ url: api_url_seo, revalidate: 3600 });
    if (!reseo.ok) {
      throw new Error(`Posts fetch failed with status: ${reseo.statusText}`);
    }
    const head = await reseo.json();
    return head?.head || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const head = await getSeoData();
  if (!head) {
    return {};
  }

  const seoHtml = replaceSeoRM(head);
  const titleMatch = seoHtml.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'Đăng ký';

  const ogTitleMatch = seoHtml.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1] : title;

  return {
    title,
    openGraph: {
      title: ogTitle,
    },
  };
}

export default async function Page() {
  const head = await getSeoData();
  const seoHtml = head ? replaceSeoRM(head) : null;

  return (
    <>
      {seoHtml && <SeoMeta seoHtml={seoHtml} />}
      <Dangky />
    </>
  );
}
