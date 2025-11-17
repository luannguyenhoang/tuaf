import dynamic from 'next/dynamic';

const DraftPosts = dynamic(() => import('@/features/draft-post').then((mod) => mod.DraftPosts));

export default function Page() {
  return <DraftPosts />;
}
