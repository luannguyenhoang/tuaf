import { fetchSeo } from '@/utils/seo';
import { replaceSeoRM } from '@/utils/seoRankMath';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'));
const Posts = dynamic(() => import('@/features/posts').then((mod) => mod.Posts));
const SeoMeta = dynamic(() => import('@/components/SeoMeta'));

async function getSeoData() {
  const api_rm_url = process.env.API_RMS_URL || '';
  const api_url = `${api_rm_url}/tin-tuc`;

  try {
    const res = await fetchSeo({ url: api_url, revalidate: 3600 });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const head = await res.json();
    return head?.head || null;
  } catch (error) {
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
  const title = titleMatch ? titleMatch[1] : 'Tin tức';

  return {
    title,
  };
}

export default async function Page() {
  const head = await getSeoData();
  const seoHtml = head ? replaceSeoRM(head) : null;

  return (
    <>
      {seoHtml && <SeoMeta seoHtml={seoHtml} />}
      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <Posts />
      </ErrorBoundary>
    </>
  );
}
