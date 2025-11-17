'use client';

import { Loading } from '@/components/Loading';
import { replaceSeoRM } from '@/utils/seoRankMath';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SeoMeta = dynamic(() => import('@/components/SeoMeta'), { ssr: false });

const Hoptac = dynamic(() => import('@/features/hop-tac').then((mod) => mod.Hoptac), {
  loading: () => <Loading />,
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [page_content, setPageContent] = useState<any>(null);
  const [seoHtml, setSeoHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch SEO
      try {
        const api_rm_url = process.env.NEXT_PUBLIC_API_RMS_URL || '';
        const api_url = `${api_rm_url}/hop-tac`;
        const res = await fetch(api_url, {
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          const head = await res.json();
          if (head?.head) {
            setSeoHtml(replaceSeoRM(head.head));
          }
        }
      } catch (error) {
        console.log(error);
      }

      // Fetch page content
      setIsLoading(true);
      try {
        const res = await fetch(`/api/content-page/?type=hop-tac`, {
          next: { revalidate: 3 },
        });
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        setPageContent(data?.posts[0]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {seoHtml && <SeoMeta seoHtml={seoHtml} />}
      {isLoading && <Loading />}
      {!isLoading && <Hoptac content={page_content} />}
    </>
  );
}
