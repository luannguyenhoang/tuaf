'use client';

import { useEffect } from 'react';

interface FormGoogleProps {
  url: string;
  divId: string;
}

export const FormGoogle: React.FC<FormGoogleProps> = ({ url, divId }) => {
  useEffect(() => {
    if (!url) {
      console.error('Invalid URL for Google Form');
      return;
    }

    const container = document.getElementById(divId);
    if (container && !container.querySelector('iframe')) {
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.width = '100%';
      iframe.height = '450px';
      iframe.frameBorder = '0';
      iframe.marginHeight = '0';
      iframe.marginWidth = '0';
      container.appendChild(iframe);
    }
  }, [url, divId]);

  return <div id={divId}></div>;
};
