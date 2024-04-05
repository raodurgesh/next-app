import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import PostShowLoading from '@/components/posts/post-show-loading';
import { fetchCommentsByPostId } from '@/db/queries/comment';
import paths from '@/paths';
import Link from 'next/link';
import { Suspense } from 'react';

interface PostShowPageProps {
  params: { postId: string; slug: string };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShow(params.slug)}
      >
        {'< '} Back to topic
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={params.postId} />
      </Suspense>
      <CommentCreateForm postId={params.postId} />
      <CommentList fetchData={() => fetchCommentsByPostId(params.postId)} />
    </div>
  );
}
