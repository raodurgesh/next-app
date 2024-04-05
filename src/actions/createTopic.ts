'use server';
import type { Topic } from '@prisma/client';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'Must be lowercase or dash without space' }),
  description: z.string().min(10, { message: 'Must be at least 10 characters' })
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();
  let topic: Topic;
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
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

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
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
          _form: ['Something went wrong !']
        }
      };
    }
  }

  revalidatePath(paths.homePath());
  redirect(paths.topicShow(topic.slug));
}
