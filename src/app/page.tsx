import PostList from '@/components/posts/post-list';
import TopicCreateForm from '@/components/topics/topicCreateForm';
import { TopicList } from '@/components/topics/topicList';
import { fetchTopPosts } from '@/db/queries/post';
import { Divider } from '@nextui-org/react';

export const revalidate = 5;
export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1> Posts</h1>
        <div className="my-2">
          <PostList fetchData={() => fetchTopPosts()} />
        </div>
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
