import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const len = searchParams.get('len') || '9';
  const api_url = process.env.API_URL || '';
  let posts: any[] = [];

  try {
    const endPoint = `${api_url}/posts?_embed&per_page=${len}&status=draft&page=1`;
    const res = await fetchAuth({ url: endPoint });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const postsNotFeatureImage: any[] = (await res?.json()) || [];
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

  return NextResponse.json({ posts });
}
