'use client';

export function storeTrackingParamsInSession() {
  const urlParams = new URLSearchParams(window.location.search);

  const trackingFields = [
    'utm_source',
    'utm_campaign',
    'utm_medium',
    'utm_content',
    'utm_term',
    'utm_referrer',
  ];

  const hasAnyTrackingParam =
    trackingFields.some((key) => urlParams.has(key)) ||
    (document.referrer && document.referrer !== sessionStorage.getItem('utm_referrer'));

  if (hasAnyTrackingParam) {
    trackingFields.forEach((key) => {
      let value = '';

      if (key === 'utm_referrer') {
        value = urlParams.get('utm_referrer') || document.referrer || '';
      } else {
        value = urlParams.get(key) || '';
      }

      sessionStorage.setItem(key, value);
    });
  }
}
