const token = process.env.TOKEN;
export const fetchAuth = ({
  url,
  method,
  revalidate,
}: {
  url: string;
  method?: 'PUT' | 'PATH';
  revalidate?: number;
}) => {
  return fetch(url, {
    method: method || 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate },
  });
};
