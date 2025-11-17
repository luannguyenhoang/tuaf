// app/components/TrackingSession.tsx
'use client';
import { storeTrackingParamsInSession } from '@/utils/storeTracking';
import { useEffect } from 'react';

export const TrackingSession = () => {
  useEffect(() => {
    storeTrackingParamsInSession();
  }, []);

  return null; // Không render gì
};
