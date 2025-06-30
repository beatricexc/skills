'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type FlashControllerProps = {
  /** How long to show (ms) */
  duration?: number;
};

export function FlashController({ duration = 8000 }: FlashControllerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasError = searchParams.get('error');
  const hasSuccess = searchParams.get('success');

  useEffect(() => {
    if (!hasError && !hasSuccess) return;
    const timer = setTimeout(() => {
      // strip both params
      const params = new URLSearchParams(searchParams.toString());
      params.delete('error');
      params.delete('success');
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, duration);

    return () => clearTimeout(timer);
  }, [hasError, hasSuccess, duration, router, searchParams]);

  return null; // no UI
}
