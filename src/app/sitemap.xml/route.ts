import { TMenus, menus } from '@/router';
import { NextResponse } from 'next/server';

// Đánh dấu route là dynamic vì sitemap cần được generate mỗi lần request
export const dynamic = 'force-dynamic';

const URL = process.env.NEXT_PUBLIC_DOMAIN;

const getAllPaths = (menus: TMenus): string[] => {
  const paths: string[] = [];
  menus.forEach((menu) => {
    if (menu.path !== '#') paths.push(menu.path);
    if (menu?.childs) {
      paths.push(...getAllPaths(menu.childs));
    }
  });
  return paths;
};

const generateSiteMap = (posts: any[]) => {
  const staticPaths = getAllPaths(menus);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPaths.map((path) => `<url><loc>${URL}${path}</loc></url>`).join('')}
    ${posts
      .map(
        (post) =>
          `<url><loc>${post.link.replace(
            /^https?:\/\/nologin\.tuaf\.vn/,
            'https://tuaf.vn'
          )}</loc></url>`
      )
      .join('')}
  </urlset>`;
};

export async function GET() {
  const allPosts: any[] = [];
  const baseURL = `https://nologin.tuaf.vn/wp-json/wp/v2/posts`;
  // Giảm per_page để tránh response quá lớn (>2MB) không thể cache
  const perPage = 50;
  let page = 1;

  try {
    while (true) {
      // Tắt cache cho sitemap vì response quá lớn (>2MB)
      const resData = await fetch(`${baseURL}?per_page=${perPage}&page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        cache: 'no-store', // Disable cache hoàn toàn
      });

      if (!resData.ok) {
        const status = resData.status;
        break;
      }

      const pageData = await resData.json();

      if (!pageData.length) {
        break;
      }

      allPosts.push(...pageData);
      page++;
    }
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách bài viết:', error);
  }

  const sitemap = generateSiteMap(allPosts);
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
      // Cache sitemap ở CDN level thay vì Next.js cache
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
