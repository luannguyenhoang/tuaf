import LayoutPost from '@/layouts/layoutPost';
import { fetchAuth } from '@/utils/fetchAuth';
import dynamic from 'next/dynamic';

const Post = dynamic(() => import('@/features/post').then((mod) => mod.Post));
const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'));

async function getPostData(id: string) {
  const api_url = process.env.API_URL || '';

  try {
    const res = await fetchAuth({
      url: `${api_url}/posts/${id}?_embed`,
    });

    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }

    const post = await res.json();
    return post || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <LayoutPost>
      <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
        <Post post={post} />
      </ErrorBoundary>
    </LayoutPost>
  );
}
