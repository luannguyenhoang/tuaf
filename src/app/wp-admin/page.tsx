'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WpAdmin() {
  const router = useRouter();

  useEffect(() => {
    router.push('https://nologin.tuaf.vn/wp-admin');
  }, [router]);

  return null;
}
