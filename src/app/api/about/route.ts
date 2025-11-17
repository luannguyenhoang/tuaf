import { clean } from '@/lib/sanitizeHtml';
import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

export async function GET() {
  const api_url = process.env.API_URL || '';
  let content = '';
  try {
    const responeWordpress = await fetchAuth({
      url: `${api_url}/posts/?slug=gioi-thieu`,
      revalidate: 10,
    });
    if (!responeWordpress.ok) {
      throw new Error(`Posts fetch failed with status: ${responeWordpress.statusText}`);
    }

    const contentType = responeWordpress.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const posts: any[] = await responeWordpress.json();
    const post = posts?.length > 0 ? posts[0] : null;
    if (post?.content?.rendered) content = clean(post?.content?.rendered);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ content });
}
