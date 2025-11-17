import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || '';
  const page = searchParams.get('page') || '';
  const api_url = process.env.API_URL || '';

  let posts: any[] = [];
  let totalPosts: string = '0';

  try {
    const idNotifi = 54;
    const id = type === 'notifis' ? idNotifi : null;
    const endPoint = id
      ? `${api_url}/posts?_embed&per_page=10&status=publish&page=${page}&categories=${id}`
      : `${api_url}/posts?_embed&per_page=10&status=publish&page=${page}`;

    const res = await fetchAuth({ url: endPoint, revalidate: 1 });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const totalPostsAll = res.headers?.get('X-WP-Total') || '0';

    totalPosts = String(Number(totalPostsAll) - 4);

    const postsNotFeatureImageAll: any[] = (await res?.json()) || [];

    const postsNotFeatureImage: any[] = postsNotFeatureImageAll.filter(
      (post) =>
        post?.slug !== 'gioi-thieu' &&
        post?.slug !== 'lich-khai-giang' &&
        post?.slug !== 'form-poup' &&
        post?.slug !== 'form-main'
    );
    posts =
      postsNotFeatureImage?.length > 0
        ? postsNotFeatureImage?.map((post: any) => {
            const featured_image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

            return {
              ...post,
              featured_image,
            };
          })
        : [];
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    posts,
    totalPosts,
  });
}
