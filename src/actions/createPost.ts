'use server';
import type { Post } from '@prisma/client';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'Must be lowercase or dash without space' }),
  content: z.string().min(10, { message: 'Must be at least 10 characters' })
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();
  let post: Post;
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['Not signed in']
      }
    };
  }

  const topic = await db.topic.findUnique({
    where: {
      slug
    }
  });

  if (!topic) {
    return {
      errors: {
        _form: ['Topic not found']
      }
    };
  }

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ['Failed to create Post!']
        }
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
