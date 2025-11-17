export const fetchSeo = ({ url, revalidate }: { url: string; revalidate?: number }) => {
  return fetch(url, {
    method: 'GET',
    next: { revalidate },
  });
};
