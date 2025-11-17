import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const catId = searchParams.get('catId') || '';
  const id = searchParams.get('id') || '';
  const api_url = process.env.API_URL || '';

  let samePosts: any[] = [];
  if (catId) {
    try {
      const resRelatedPosts = await fetchAuth({
        url: `${api_url}/posts/?categories=${catId}&exclude=${id}&per_page=3&_embed`,
        revalidate: 1,
      });
      if (!resRelatedPosts.ok) {
        throw new Error(`Posts fetch failed with status: ${resRelatedPosts.statusText}`);
      }

      const contentType = resRelatedPosts.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but got ${contentType}`);
      }

      const relatedPosts: any[] = await resRelatedPosts.json();
      const postsWithFeaturedImages =
        relatedPosts?.length > 0
          ? relatedPosts?.map((post: any) => {
              const featured_image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

              return {
                ...post,
                featured_image,
              };
            })
          : [];

      samePosts = postsWithFeaturedImages;
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.json({ samePosts });
}
