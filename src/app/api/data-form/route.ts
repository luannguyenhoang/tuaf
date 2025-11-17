import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || '';
  const api_url = process.env.API_URL || '';
  let url: string = '';
  let uuid: string = '';
  let divId: string = '';
  let divClass: string = '';
  try {
    const responeWordpress = await fetchAuth({
      url: `${api_url}/form`,
      revalidate: 1,
    });
    if (!responeWordpress.ok) {
      throw new Error(`Posts fetch failed with status: ${responeWordpress.statusText}`);
    }

    const contentType = responeWordpress.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const data: any[] = await responeWordpress.json();
    const htmlString = data?.length > 0 ? data[0]?.acf?.[String(type)] : '';

    const getFormRegex = /GetForm\("([^"]+)", "([^"]+)"\)/;
    const divRegex = /<div id="([^"]+)" class="([^"]+)"/;
    const getFormMatch = htmlString.match(getFormRegex);
    const divMatch = htmlString.match(divRegex);

    if (getFormMatch && divMatch) {
      url = getFormMatch[1];
      uuid = getFormMatch[2];

      divId = divMatch[1];
      divClass = divMatch[2];
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    url,
    uuid,
    divId,
    divClass,
  });
}
