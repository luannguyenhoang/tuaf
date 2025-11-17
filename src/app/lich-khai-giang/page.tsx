'use client';

import { Loading } from '@/components/Loading';
import { replaceSeoRM } from '@/utils/seoRankMath';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SeoMeta = dynamic(() => import('@/components/SeoMeta'), { ssr: false });

const LichKg = dynamic(() => import('@/features/lich-khai-giang').then((mod) => mod.LichKg), {
  loading: () => <Loading />,
});

export default function Page() {
  const [list, setList] = useState<string[]>([
    'Lịch khai giảng tại Hồ Chí Minh: 15/10/2023',
    'Lịch khai giảng tại Hồ Chí Minh: 15/10/2023',
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [page_content, setPageContent] = useState<any>(null);
  const [seoHtml, setSeoHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch SEO
      try {
        const api_rm_url = process.env.NEXT_PUBLIC_API_RMS_URL || '';
        const api_url_seo = `${api_rm_url}/lich-khai-giang`;
        const reseo = await fetch(api_url_seo, {
          next: { revalidate: 3600 },
        });
        if (reseo.ok) {
          const head = await reseo.json();
          if (head?.head) {
            setSeoHtml(replaceSeoRM(head.head));
          }
        }
      } catch (error) {
        console.log(error);
      }

      // Fetch lich kg
      try {
        const res = await fetch('/api/data-lichKg');
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        const listData: string[] = data?.list || [];
        const content: any[] = data?.content || [];
        content?.length > 0 && setPageContent(content[0]);
        listData?.length > 0 && setList(listData);
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
      <LichKg list={list} isLoading={isLoading} page_content={page_content} />
    </>
  );
}
