import PostList from '@/components/posts/post-list';
import { fetchPostBySearchTerm } from '@/db/queries/post';
import { redirect } from 'next/navigation';

interface SearchPageProps {
  searchParams: { term: string };
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) {
    redirect('/');
  }

  return (
    <div>
      <PostList fetchData={() => fetchPostBySearchTerm(term)} />
    </div>
  );
}
