'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loading } from '@/components/Loading';

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'));
const Search = dynamic(() => import('@/features/search').then((mod) => mod.Search));

export default function Page() {
  return (
    <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
      <Suspense fallback={<Loading />}>
        <Search />
      </Suspense>
    </ErrorBoundary>
  );
}
