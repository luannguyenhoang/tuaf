'use client';

import { useEffect } from 'react';

// Hàm tạo tham số UTM
const buildUtmParamsForGetFly = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term'];
  let utmParams = '';

  utmKeys.forEach((key) => {
    const value = urlParams.get(key) || document.cookie.match(new RegExp(`${key}=([^;]+)`))?.[1];
    if (value) {
      utmParams += `&${key}=${encodeURIComponent(value)}`;
    }
  });

  utmParams += `&full_url=${encodeURIComponent(window.location.href)}`;
  return utmParams;
};

const createIframeForGetFly = (url: string): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', `${url}${buildUtmParamsForGetFly()}`);
  iframe.style.width = '100%';
  iframe.style.minHeight = '450px';
  iframe.setAttribute('frameborder', '0');
  return iframe;
};

const attachIframeForGetFly = (url: string): void => {
  const containers = document.querySelectorAll('[id*="getfly-optin-form-iframe"]');
  Array.from(containers).forEach((container) => {
    if (!container.querySelector('iframe')) {
      const iframe = createIframeForGetFly(url);
      container.appendChild(iframe);
    }
  });
};

interface FormProps {
  url: string;
  uuid: string;
  divId: string;
  divClass: string;
}

export const FormGetFly: React.FC<FormProps> = ({ url, divId, divClass }) => {
  useEffect(() => {
    if (url && divId) {
      attachIframeForGetFly(url);
    }
  }, [url, divId]);

  return <div id={divId} className={divClass}></div>;
};
