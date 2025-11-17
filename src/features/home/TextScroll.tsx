'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const TextScroll = dynamic(() => import('@/components/TextScroll').then((mod) => mod.TextScroll));

export const TextScrollHomePage = () => {
  const [list, setList] = useState<string[]>([
    'Lịch khai giảng tại Hồ Chí Minh: 15/10/2023',
    'Lịch khai giảng tại Hồ Chí Minh: 15/10/2023',
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLichKg = async () => {
      try {
        const timeout = setTimeout(async () => {
          const res = await fetch('/api/data-lichKg');
          if (!res.ok) {
            throw new Error(`Posts fetch failed with status: ${res.statusText}`);
          }
          const data = await res.json();
          const newList: string[] = data?.list || [];
          if (newList.length > 0) setList(newList);
          setIsLoading(false);
        }, 3000); // Gọi API sau 3 giây

        return () => clearTimeout(timeout);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getLichKg();
  }, []);

  return <TextScroll list={list} isLoading={isLoading} />;
};
