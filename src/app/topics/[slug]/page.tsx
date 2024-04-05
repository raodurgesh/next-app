import PostList from '@/components/posts/post-list';
import PostCreateForm from '@/components/posts/postCreateForm';
import { fetchPostsByTopicSlug } from '@/db/queries/post';

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;

  return (
    <div className="grid grid-cols-4 p-4 gap-4">
      <div className="col-span-3 ">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
