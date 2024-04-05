import { Post } from '@prisma/client';
import { db } from '..';

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function fetchPostBySearchTerm(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }]
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: {
        select: {
          comments: true
        }
      }
    }
  });
}

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      topic: {
        slug: slug
      }
    },
    include: {
      topic: true,
      user: true,
      _count: {
        select: {
          comments: true
        }
      }
    }
  });
}

export async function fetchTopPosts() {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: {
        select: {
          comments: true
        }
      }
    },
    orderBy: {
      comments: {
        _count: 'desc'
      }
    },
    take: 5
  });
}
