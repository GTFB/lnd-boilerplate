'use client';

import { useEffect, useState } from 'react';

export function useAnalytics() {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check analytics consent
    const analyticsConsent = localStorage.getItem('analytics-consent');
    if (analyticsConsent === 'true') {
      setIsAnalyticsEnabled(true);
      // Load analytics only with consent
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
    // Here you can load Google Analytics, Plausible or other analytics
    console.log('Loading analytics...');
    
    // Example of loading Google Analytics
    // const script = document.createElement('script');
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    // document.head.appendChild(script);
  };

  const enableAnalytics = () => {
    localStorage.setItem('analytics-consent', 'true');
    setIsAnalyticsEnabled(true);
    loadAnalytics();
  };

  const disableAnalytics = () => {
    localStorage.setItem('analytics-consent', 'false');
    setIsAnalyticsEnabled(false);
  };

  return {
    isAnalyticsEnabled,
    enableAnalytics,
    disableAnalytics
  };
}
