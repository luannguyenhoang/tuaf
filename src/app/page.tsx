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

async function getHomeContent() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tuaf.vn';
  try {
    const res = await fetch(`${baseUrl}/api/content-page/?type=trang-chu`, {
      next: { revalidate: 3 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.posts[0];
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const [head, homeContent] = await Promise.all([getSeoData(), getHomeContent()]);

  if (!head) {
    return {};
  }

  const seoHtml = replaceSeoRM(head);
  const titleMatch = seoHtml.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'Trường Đại học Nông Lâm Thái Nguyên';
  const descMatch = seoHtml.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
  const description = descMatch ? descMatch[1] : 'Trường Đại học Nông Lâm Thái Nguyên';
  const canonicalMatch = seoHtml.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/);
  const canonical = canonicalMatch ? canonicalMatch[1] : undefined;
  const ogTitleMatch = seoHtml.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1] : title;
  const ogDescMatch = seoHtml.match(
    /<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/
  );
  const ogDescription = ogDescMatch ? ogDescMatch[1] : description;
  const ogImageMatch = seoHtml.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/);
  const ogImage = ogImageMatch ? ogImageMatch[1] : undefined;

  const bannerImage = homeContent?.acf?.text_banner_t?.list_3?.[0]?.image;

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
      __seoHtml: seoHtml,
      __bannerImage: bannerImage,
    },
  };
}

export default async function Page() {
  const [head, homeContent] = await Promise.all([getSeoData(), getHomeContent()]);
  const seoHtml = head ? replaceSeoRM(head) : null;
  const bannerImage = homeContent?.acf?.text_banner_t?.list_3?.[0]?.image;

  return (
    <>
      {bannerImage && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(bannerImage)}&w=1920&q=70`}
          fetchPriority="high"
          crossOrigin="anonymous"
        />
      )}
      {seoHtml && <SeoMeta seoHtml={seoHtml} />}
      <Home initialHomeContent={homeContent} />
    </>
  );
}
