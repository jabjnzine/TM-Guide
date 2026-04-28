'use client';

import { useEffect } from 'react';

export default function ErudaInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    import('eruda').then((eruda) => eruda.default.init());
  }, []);

  return null;
}
