import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchtext = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';
  const api_url = process.env.API_URL || '';

  const per_page = 9;
  let posts: any[] = [];
  let totalPosts: string = '0';

  try {
    const endPoint = `${api_url}/posts?search=${searchtext}&_embed&per_page=100&status=publish`;
    const response = await fetchAuth({ url: endPoint, revalidate: 1 });

    if (!response.ok) {
      throw new Error(`Search fetch failed with status: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const allPosts: any[] = (await response?.json()) || [];

    const filteredPosts = allPosts.filter((post) => {
      const slug = post.slug || '';
      const searchWords = searchtext.toString().toLowerCase().split(/\s+/);

      const excludedSlugs = ['lich-khai-giang', 'form-main', 'form-poup', 'gioi-thieu'];

      const hasSearchTextInSlug = searchWords.some((word) => slug.toLowerCase().includes(word));

      return !excludedSlugs.includes(slug) && hasSearchTextInSlug;
    });

    totalPosts = String(filteredPosts.length);

    const startIndex = (Number(page) - 1) * per_page;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + per_page);

    posts = paginatedPosts.map((post: any) => {
      const featured_image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

      return {
        ...post,
        featured_image,
      };
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    posts,
    totalPosts,
  });
}
