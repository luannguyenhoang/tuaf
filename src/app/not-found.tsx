'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Tự động redirect về trang chủ sau khi component mount
    router.replace('/');
  }, [router]);

  // Trả về null hoặc loading state trong khi redirect
  return null;
}
