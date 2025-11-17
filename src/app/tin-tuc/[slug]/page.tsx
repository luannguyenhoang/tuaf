import { fetchAuth } from '@/utils/fetchAuth';
import { fetchSeo } from '@/utils/seo';
import { replaceSeoRM } from '@/utils/seoRankMath';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import LayoutPost from '@/layouts/layoutPost';

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'));
const Post = dynamic(() => import('@/features/post').then((mod) => mod.Post));
const SeoMeta = dynamic(() => import('@/components/SeoMeta'));

async function getPostData(slug: string) {
  const api_url = process.env.API_URL || '';
  const url = process.env.API_RMS_URL || '';

  try {
    const [res, resSeo] = await Promise.all([
      fetchAuth({
        url: `${api_url}/posts?slug=${slug}`,
        revalidate: 3600,
      }),
      fetchSeo({
        url: `${url}/${slug}`,
        revalidate: 3600,
      }),
    ]);

    if (!res.ok || !resSeo.ok) {
      throw new Error('Failed to fetch data');
    }

    const [head, posts] = await Promise.all([resSeo.json(), res.json()]);
    const post = posts ? posts[0] : null;

    return { post: post || null, head: head.head || null };
  } catch (error) {
    console.log(error);
    return { post: null, head: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { head } = await getPostData(slug);
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, head } = await getPostData(slug);
  const seoHtml = head ? replaceSeoRM(head) : null;

  return (
    <>
      {seoHtml && <SeoMeta seoHtml={seoHtml} />}
      <LayoutPost>
        <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
          <Post post={post} />
        </ErrorBoundary>
      </LayoutPost>
    </>
  );
}
