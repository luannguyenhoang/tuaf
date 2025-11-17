'use client';

import ReactHtmlParser from 'html-react-parser';
import { useEffect } from 'react';

interface SeoMetaProps {
  seoHtml: string;
}

export default function SeoMeta({ seoHtml }: SeoMetaProps) {
  useEffect(() => {
    // Parse and inject meta tags into head
    const parser = new DOMParser();
    const doc = parser.parseFromString(seoHtml, 'text/html');
    const head = document.head;

    // Get all meta, link, script, and title tags
    const metaTags = doc.querySelectorAll('meta');
    const linkTags = doc.querySelectorAll('link');
    const scriptTags = doc.querySelectorAll('script');
    const titleTag = doc.querySelector('title');

    // Remove existing meta tags that might conflict
    const existingMeta = head.querySelectorAll('meta[data-dynamic-seo]');
    existingMeta.forEach((tag) => tag.remove());

    // Add title
    if (titleTag) {
      const existingTitle = head.querySelector('title');
      if (existingTitle) {
        existingTitle.textContent = titleTag.textContent;
      } else {
        head.appendChild(document.createElement('title')).textContent = titleTag.textContent;
      }
    }

    // Add meta tags
    metaTags.forEach((meta) => {
      const newMeta = document.createElement('meta');
      Array.from(meta.attributes).forEach((attr) => {
        newMeta.setAttribute(attr.name, attr.value);
      });
      newMeta.setAttribute('data-dynamic-seo', 'true');
      head.appendChild(newMeta);
    });

    // Add link tags
    linkTags.forEach((link) => {
      const newLink = document.createElement('link');
      Array.from(link.attributes).forEach((attr) => {
        newLink.setAttribute(attr.name, attr.value);
      });
      newLink.setAttribute('data-dynamic-seo', 'true');
      head.appendChild(newLink);
    });

    // Add script tags
    scriptTags.forEach((script) => {
      const newScript = document.createElement('script');
      Array.from(script.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (script.textContent) {
        newScript.textContent = script.textContent;
      }
      newScript.setAttribute('data-dynamic-seo', 'true');
      head.appendChild(newScript);
    });

    // Cleanup function
    return () => {
      const dynamicTags = head.querySelectorAll('[data-dynamic-seo]');
      dynamicTags.forEach((tag) => tag.remove());
    };
  }, [seoHtml]);

  return null;
}
