import '@/styles/globals.css';
import '@/styles/tableContent.css';
import { ModalProvider } from '@/components/ModalContext';
import ChakraProviderWrapper from '@/components/ChakraProviderWrapper';
import Layout from '@/layouts';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://tuaf.vn'),
  title: 'Trường Đại học Nông Lâm Thái Nguyên',
  description: 'Trường Đại học Nông Lâm Thái Nguyên',
  lang: 'vi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://nologin.tuaf.vn" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://nologin.tuaf.vn" />
      </head>
      <body>
        <Script
          id="load-google-fonts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              var fontLinkId = 'google-fonts-stylesheet';
              if (document.getElementById(fontLinkId)) return;
              var link = document.createElement('link');
              link.id = fontLinkId;
              link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap';
              link.rel = 'stylesheet';
              link.media = 'print';
              link.onload = function() { this.media = 'all'; };
              document.head.appendChild(link);
            })();
            `,
          }}
        />
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KTHCFGD');
            `,
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTHCFGD"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <ChakraProviderWrapper>
          <ModalProvider>
            <Layout>{children}</Layout>
          </ModalProvider>
        </ChakraProviderWrapper>
      </body>
    </html>
  );
}
