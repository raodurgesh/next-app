'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

interface FormParams {
  postId: string;
  parentId?: string;
}

const createCommentSchema = z.object({
  content: z.string().min(3)
});

export async function createComment(
  formParams: FormParams,
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get('content')
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must sign in to do this.']
      }
    };
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        postId: formParams.postId,
        parentId: formParams.parentId,
        userId: session.user.id
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ['Something went  in createComment.']
        }
      };
    }
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: formParams.postId } } }
  });

  if (!topic) {
    return {
      errors: {
        _form: ['Topic not found.']
      }
    };
  }

  revalidatePath(paths.postShow(topic.slug, formParams.postId));

  return {
    errors: {},
    success: true
  };
}
