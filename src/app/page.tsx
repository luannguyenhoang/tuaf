import { fetchSeo } from '@/utils/seo';
import { replaceSeoRM } from '@/utils/seoRankMath';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const Home = dynamic(() => import('@/features/home').then((mod) => mod.Home));
const SeoMeta = dynamic(() => import('@/components/SeoMeta'));

async function getSeoData() {
  const api_rm_url = process.env.API_RMS_URL || '';
  const api_url = `${api_rm_url}`;

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

  // Parse SEO data from head string
  const seoHtml = replaceSeoRM(head);

  // Extract title
  const titleMatch = seoHtml.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'Trường Đại học Nông Lâm Thái Nguyên';

  // Extract description
  const descMatch = seoHtml.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
  const description = descMatch ? descMatch[1] : 'Trường Đại học Nông Lâm Thái Nguyên';

  // Extract canonical
  const canonicalMatch = seoHtml.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/);
  const canonical = canonicalMatch ? canonicalMatch[1] : undefined;

  // Extract Open Graph data
  const ogTitleMatch = seoHtml.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1] : title;

  const ogDescMatch = seoHtml.match(
    /<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/
  );
  const ogDescription = ogDescMatch ? ogDescMatch[1] : description;

  const ogImageMatch = seoHtml.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/);
  const ogImage = ogImageMatch ? ogImageMatch[1] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    other: {
      // For additional meta tags that need to be parsed from HTML
      __seoHtml: seoHtml,
    },
  };
}

export default async function Page() {
  const head = await getSeoData();
  const seoHtml = head ? replaceSeoRM(head) : null;

  return (
    <>
      {seoHtml && <SeoMeta seoHtml={seoHtml} />}
      <Home />
    </>
  );
}
