'use client';

import { useEffect } from 'react';

// Hàm đọc các trường từ sessionStorage
const getTrackingParamsFromSession = (): string => {
  const keys = [
    'utm_source',
    'utm_campaign',
    'utm_medium',
    'utm_content',
    'utm_term',
    'utm_referrer',
  ];

  const queryParams = new URLSearchParams();

  keys.forEach((key) => {
    const value = sessionStorage.getItem(key);
    if (value && value.trim() !== '') {
      queryParams.set(key, value);
    }
  });

  return queryParams.toString(); // Ví dụ: utm_source=zalo&utm_campaign=test...
};

// Hàm tạo iframe
const createIframeForSam = (url: string, uuid: string, divClass: string): HTMLIFrameElement => {
  const trackingQuery = getTrackingParamsFromSession();
  const fullUrl = trackingQuery ? `${url}?${trackingQuery}` : url;

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', fullUrl);
  iframe.style.width = '100%';
  iframe.style.minHeight = '450px';
  iframe.classList.add(divClass);
  return iframe;
};

// Hàm gắn iframe vào container
const attachIframeForSam = (url: string, uuid: string, divId: string, divClass: string): void => {
  const containers = document.getElementsByClassName(divClass);
  Array.from(containers).forEach((container) => {
    if (!container.querySelector('iframe')) {
      const iframe = createIframeForSam(url, uuid, divClass);
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

export const FormSam: React.FC<FormProps> = ({ url, uuid, divId, divClass }) => {
  useEffect(() => {
    if (url && divClass) {
      attachIframeForSam(url, uuid, divId, divClass);
    }
  }, [url, uuid, divId, divClass]);

  return <div id={divId} className={divClass}></div>;
};
