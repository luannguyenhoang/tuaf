import { fetchAuth } from '@/utils/fetchAuth';
import { NextResponse } from 'next/server';

type FormData = {
  type: 'form-getfly' | 'form-sam' | 'form-google' | 'unknown';
  url: string;
  uuid?: string;
  divId: string;
  divClass?: string;
  error?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'form-main';
  const api_url = process.env.API_URL;

  if (!api_url) {
    return NextResponse.json(
      {
        type: 'unknown',
        url: '',
        divId: '',
        error: 'API_URL is not defined',
      },
      { status: 500 }
    );
  }

  let url = '';
  let divId = '';

  try {
    const responseWordpress = await fetchAuth({
      url: `${api_url}/form`,
      revalidate: 1,
    });

    if (!responseWordpress.ok) {
      throw new Error(`API fetch failed with status: ${responseWordpress.status}`);
    }

    const contentType = responseWordpress.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    const data: any[] = await responseWordpress.json();
    const htmlString = data?.length > 0 ? data[0]?.acf?.[String(type)] : '';

    if (!htmlString) {
      return NextResponse.json(
        {
          type: 'unknown',
          url: '',
          divId: '',
          error: 'No form data found',
        },
        { status: 404 }
      );
    }

    if (htmlString.includes('google.com/forms')) {
      const iframeRegex = /<iframe[^>]+src="([^"]+)"[^>]*>/;
      const iframeMatch = htmlString.match(iframeRegex);
      url = iframeMatch?.[1] || '';
      divId = 'google-form-container';

      return NextResponse.json({ type: 'form-google', url, divId });
    } else if (htmlString.includes('GetForm')) {
      const getFormRegex = /GetForm\("([^"]+)", "([^"]+)"\)/;
      const divRegex = /<div id="([^"]+)" class="([^"]+)"/;
      const getFormMatch = htmlString.match(getFormRegex);
      const divMatch = htmlString.match(divRegex);

      url = getFormMatch?.[1] || '';
      const uuid = getFormMatch?.[2] || '';
      divId = divMatch?.[1] || '';
      const divClass = divMatch?.[2] || '';

      return NextResponse.json({ type: 'form-sam', url, uuid, divId, divClass });
    } else {
      const idRegex = /id="([^"]+)"/;
      const hrefRegex = /https:\/\/[^"]+/;
      const idMatch = htmlString.match(idRegex);
      const hrefMatch = htmlString.match(hrefRegex);

      const uuid = idMatch?.[1] || '';
      url = hrefMatch?.[0] || '';
      divId = uuid;
      const divClass = 'formio_form_iframe_container';

      return NextResponse.json({ type: 'form-getfly', url, uuid, divId, divClass });
    }
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return NextResponse.json(
      {
        type: 'unknown',
        url: '',
        divId: '',
        error: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
