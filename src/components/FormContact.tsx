'use client';

import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';

const comonForm = ({
  uuid,
  url,
  size,
}: {
  uuid: string;
  url: string;
  size?: { width?: string; height?: string };
}) => {
  if (!url) {
    console.error('Invalid URL. Skipping iframe creation.');
    return;
  }
  const f = document.createElement('iframe');
  // const url_string = new URLSearchParams(window.location.search);
  let class_form = document.getElementsByClassName('formio_form_iframe_container');
  let i = 0;
  let odoo_utm = th_get_cookie();
  f.setAttribute('src', url + odoo_utm);
  f.style.width = size?.width || '100%';
  f.style.minHeight = size?.height || '450px';
  f.classList.add('formio_form_embed');
  for (; i < class_form.length; i++) {
    const new_id = 'formio_form_iframe_container_' + uuid + '_' + i;
    class_form[i].id = new_id;
    const s = document.getElementById(new_id);
    s?.appendChild(f);
  }
  function th_get_cookie() {
    let fullUrl = window.location.href;
    let utm_campaign = '';
    let utm_source = '';
    let utm_medium = '';
    let th_odoo_utm_source = document.cookie.match(new RegExp('odoo_utm_source' + '=([^;]+)'));
    let th_odoo_utm_campaign = document.cookie.match(new RegExp('odoo_utm_campaign' + '=([^;]+)'));
    let th_odoo_utm_medium = document.cookie.match(new RegExp('odoo_utm_medium' + '=([^;]+)'));
    if (th_odoo_utm_source != null) {
      utm_campaign =
        th_odoo_utm_campaign != null
          ? '&utm_campaign=' + th_odoo_utm_campaign[0].split('=')[1]
          : '';
      utm_source = '?utm_source=' + th_odoo_utm_source[0].split('=')[1];
      utm_medium =
        th_odoo_utm_medium != null ? '&utm_medium=' + th_odoo_utm_medium[0].split('=')[1] : '';
    } else {
      let utmParams: Record<string, string> = {};
      if (fullUrl.split('?')[1] != null) {
        const params = new URLSearchParams(fullUrl.split('?')[1]);
        for (const [key, val] of params) {
          if (key.startsWith('utm_')) {
            utmParams[key] = val;
          }
        }
        utm_campaign =
          'utm_campaign' in utmParams ? '&utm_campaign=' + utmParams['utm_campaign'] : '';
        utm_source = 'utm_source' in utmParams ? '?utm_source=' + utmParams['utm_source'] : '';
        utm_medium = 'utm_medium' in utmParams ? '&utm_medium=' + utmParams['utm_medium'] : '';
      }
    }
    return fullUrl.split('?')[1] ? '?' + fullUrl.split('?')[1] : '';
  }
};
export const FormMain = ({ title, color }: { title?: string; color?: string }) => {
  const [embed, setEmbed] = useState({
    uuid: '',
    url: '',
    divClass: '',
    divId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await fetch(`/api/data-form/?type=form-main`);
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data = await res.json();
        const uuid = data?.uuid || '';
        const url = data?.url || '';
        const divClass = data?.divClass || '';
        const divId = data?.divId || '';

        setEmbed({
          uuid,
          url,
          divClass,
          divId,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getForm();
  }, [isLoading]);

  useEffect(() => {
    comonForm({
      uuid: embed.uuid,
      url: embed.url,
    });
  }, [embed.url, embed.uuid, isLoading]);

  return (
    <>
      {title && (
        <Heading
          as={'h2'}
          size={{ base: 'md', md: 'lg' }}
          textAlign={'center'}
          color={color}
          pt={'10px'}
          pb={'16px'}
        >
          {title}
        </Heading>
      )}

      {isLoading && <Loading he={'38vh'} />}
      {!isLoading && <div id={embed.divId} title="form-main" className={embed.divClass} />}
    </>
  );
};
