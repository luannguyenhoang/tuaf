import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

export async function GET() {
  const api_url = process.env.API_URL || '';
  let filteredLines: string[] = [];
  let content: any[] = [];
  try {
    const responeWordpress = await fetchAuth({
      url: `${api_url}/lich-khai-giang/?id=21581`,
      revalidate: 10,
    });
    if (!responeWordpress.ok) {
      throw new Error(`Posts fetch failed with status: ${responeWordpress.statusText}`);
    }

    const contentType = responeWordpress.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const data: any[] = await responeWordpress.json();

    const htmlString = data?.length > 0 ? data[0]?.content?.rendered : ``;

    const textContent = htmlString.replace(/(&#8211;|<[^>]*>)/g, '');

    const lines = textContent.split('\n');
    content = data;
    filteredLines = lines?.filter((line: string) => line.trim() !== '');
    filteredLines = filteredLines?.map((line: string) => line?.trim());
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    list: filteredLines || [],
    content: content || [],
  });
}
