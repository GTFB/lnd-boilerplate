'use client';

import { useEffect, useState } from 'react';

export function useMarketing() {
  const [isMarketingEnabled, setIsMarketingEnabled] = useState(false);

  useEffect(() => {
    // Check marketing cookies consent
    const marketingConsent = localStorage.getItem('marketing-consent');
    if (marketingConsent === 'true') {
      setIsMarketingEnabled(true);
      // Load marketing scripts only with consent
      loadMarketingScripts();
    }
  }, []);

  const loadMarketingScripts = () => {
    // Here you can load Facebook Pixel, Google Ads and other marketing scripts
    console.log('Loading marketing scripts...');
    
    // Example of loading Facebook Pixel
    // const script = document.createElement('script');
    // script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    // document.head.appendChild(script);
  };

  const enableMarketing = () => {
    localStorage.setItem('marketing-consent', 'true');
    setIsMarketingEnabled(true);
    loadMarketingScripts();
  };

  const disableMarketing = () => {
    localStorage.setItem('marketing-consent', 'false');
    setIsMarketingEnabled(false);
  };

  return {
    isMarketingEnabled,
    enableMarketing,
    disableMarketing
  };
}
