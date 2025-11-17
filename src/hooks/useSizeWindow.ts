'use client';

import { useEffect, useState } from 'react';

export const useSize = () => {
  const hasWindow = typeof window !== 'undefined';
  const [size, setSize] = useState({
    width: hasWindow ? window.innerWidth : 0,
    height: hasWindow ? window.scrollY : 0,
  });

  useEffect(() => {
    const setHeigth = () => {
      const newHeight = hasWindow ? window.scrollY : 0;
      newHeight && setSize((prev) => ({ ...prev, height: newHeight }));
    };
    const setWidth = () => {
      const newWidth = hasWindow ? window.innerWidth : 0;
      newWidth && setSize((prev) => ({ ...prev, width: newWidth }));
    };
    hasWindow && window.addEventListener('scroll', setHeigth);
    hasWindow && window.addEventListener('resize', setWidth);

    return () => {
      window.removeEventListener('resize', setWidth);
      window.removeEventListener('scroll', setHeigth);
    };
  }, [hasWindow]);

  return { size };
};
