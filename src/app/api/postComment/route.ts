import { NextResponse } from 'next/server';

type ErrorResponse = { error: string };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { post, author_name, author_email, content, parent } = body || {};

    const payload: Record<string, any> = {
      post,
      author_name,
      author_email,
      content,
    };

    if (parent && Number(parent) > 0) {
      payload.parent = Number(parent);
    }

    const username = process.env.NEXT_PUBLIC_WP_USERNAME;
    const appPassword = process.env.NEXT_PUBLIC_WP_APP_PASSWORD;
    const hasAuth = Boolean(username && appPassword);
    const authString = hasAuth ? Buffer.from(`${username}:${appPassword}`).toString('base64') : '';

    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      return NextResponse.json({ error: 'Thiếu cấu hình API_URL' }, { status: 500 });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (hasAuth) {
      headers.Authorization = `Basic ${authString}`;
    }

    const wpResponse = await fetch(`${apiUrl}/comments`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const responseText = await wpResponse.text();

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json(
        {
          error: `Không thể phân tích phản hồi từ WordPress: ${responseText.substring(0, 200)}...`,
        },
        { status: wpResponse.status }
      );
    }

    if (!wpResponse.ok) {
      return NextResponse.json(
        { error: data?.message || 'Lỗi khi gửi bình luận' },
        { status: wpResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Lỗi server' }, { status: 500 });
  }
}
