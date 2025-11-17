import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || '';
  const api_url = process.env.API_URL || '';
  const hasSSL = process.env.NEXT_PUBLIC_HAS_SSL || 'true';
  if (hasSSL === 'false') process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  let posts: any[] = [];

  try {
    const endPoint = `${api_url}/${type}`;

    const res = await fetch(endPoint, {
      next: { revalidate: 1 },
    });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    posts = (await res?.json()) || [];
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ posts });
}
