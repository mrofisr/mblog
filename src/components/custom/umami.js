// /src/components/UmamiScript.js
'use client';

import Script from 'next/script';

export default function UmamiScript({ scriptUrl, websiteId }) {
  return (
    <Script
      async
      src={scriptUrl || 'https://umami.is/script.js'}
      data-website-id={websiteId || '00000000-0000-0000-0000-000000000000'}
      defer
      strategy="afterInteractive"
    />
  );
}
