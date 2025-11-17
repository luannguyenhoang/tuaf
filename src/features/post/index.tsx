'use client';

import CommentsPost from '@/components/Comment';
import { clean } from '@/lib/sanitizeHtml';
import styles from '@/styles/Post.module.css';
import { formatDate } from '@/utils/date';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';

const SamePosts = dynamic(() => import('@/features/post/Sames').then((mod) => mod.SamePosts));
const Share = dynamic(() => import('@/features/post/Share').then((mod) => mod.Share));

export const Post = ({ post }: { post: any }) => {
  const catIds = post?.categories || [];
  const catId = catIds[0];

  // tìm và thay thế thẻ href thành thẻ id  (do plugin )
  useEffect(() => {
    const replaceHrefWithId = () => {
      const ezTocContainer = document.getElementById('ez-toc-container');

      if (ezTocContainer) {
        const tocLinks = ezTocContainer.querySelectorAll('a[href*="#"]');

        tocLinks.forEach((link) => {
          link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default behavior of jumping to the anchor

            const href = link.getAttribute('href');
            const match = href?.match(/#(.+)$/);

            if (match && match[1]) {
              const id = match[1];
              const targetElement = document.getElementById(id);

              if (targetElement) {
                const offset = 150;
                const targetElementTop = targetElement.getBoundingClientRect().top;
                window.scrollTo({
                  top: window.scrollY + targetElementTop - offset,
                  behavior: 'smooth',
                });
              }
            }
          });
        });
      }
    };

    const getAngleIcon = (direction: 'up' | 'down') => {
      if (direction === 'up') {
        return `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 320 512">
        <path d="M168.5 164.7c-7.5-7.5-19.8-7.5-27.3 0l-144 144c-7.6 7.6-7.6 19.8 0 27.4s19.8 7.6 27.4 0L160 202.7l135.4 135.4c7.6 7.6 19.8 7.6 27.4 0s7.6-19.8 0-27.4l-144-144z"/>
      </svg>`;
      } else {
        return `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" viewBox="0 0 320 512">
        <path d="M143.5 347.3c7.5 7.5 19.8 7.5 27.3 0l144-144c7.6-7.6 7.6-19.8 0-27.4s-19.8-7.6-27.4 0L160 309.3 24.6 174c-7.6-7.6-19.8-7.6-27.4 0s-7.6 19.8 0 27.4l144 144z"/>
      </svg>`;
      }
    };
    const getMenuIcon = () => `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" viewBox="0 0 448 512">
    <path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm416 160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32z"/>
  </svg>`;

    const injectToggleButton = () => {
      const ezTocContainer = document.getElementById('ez-toc-container');
      if (!ezTocContainer) return;

      const navList = ezTocContainer.querySelector('nav');
      if (!navList) return;

      // Nếu đã có toggle thì bỏ qua
      if (ezTocContainer.querySelector('.custom-toc-toggle')) return;

      // === Responsive: nếu < 768px thì ẩn nav mặc định
      let isVisible = true;
      if (window.innerWidth < 768) {
        navList.style.display = 'none';
        isVisible = false;
      }

      // Tạo nút toggle
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'custom-toc-toggle';
      toggleBtn.innerHTML = getAngleIcon(isVisible ? 'up' : 'down');
      toggleBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    z-index: 10;
  `;

      toggleBtn.onclick = () => {
        isVisible = !isVisible;
        navList.style.display = isVisible ? 'block' : 'none';
        toggleBtn.innerHTML = getAngleIcon(isVisible ? 'up' : 'down');
      };

      ezTocContainer.style.position = 'relative';
      ezTocContainer.appendChild(toggleBtn);

      // === Thêm icon menu bên trái tiêu đề
      const titleElement = ezTocContainer.querySelector('.ez-toc-title');
      if (titleElement && !titleElement.querySelector('.toc-menu-icon')) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'toc-menu-icon';
        iconSpan.style.cssText = `
      display: inline-block;
      margin-right: 6px;
      vertical-align: baseline;
    `;
        iconSpan.innerHTML = getMenuIcon();
        titleElement.prepend(iconSpan);
      }
    };

    replaceHrefWithId();
    injectToggleButton();
  }, [post]);

  return (
    <article className={styles['post']}>
      <div className={styles['post--share']}>
        <Share url={post?.slug || '#'} />
      </div>
      <main>
        {post && (
          <>
            <div className={styles['post__main']}>
              <div className={styles['post__heading']}>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: clean(post?.title?.rendered),
                  }}
                />
                <span>{formatDate(post?.date)}</span>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: clean(post?.content?.rendered),
                }}
              />
            </div>
            <CommentsPost slug={post?.id} />
            <SamePosts catId={catId} id={post?.id} />
          </>
        )}

        {!post && (
          <div className={styles['not-found']}>
            <p>Bài viết này không tồn tại!</p>
            <Link className={styles['back-new']} href={'/tin-tuc'}>
              Trở về trang tin tức
            </Link>
          </div>
        )}
      </main>
    </article>
  );
};
