'use client';

import {
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
  Input,
  Textarea
} from '@nextui-org/react';

import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import FormButton from '../common/formButton';

export default function PostCreateForm({ slug }: { slug: string }) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    {
      errors: {}
    }
  );

  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create Post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Post</h3>
              <Input
                label="Title"
                labelPlacement="outside"
                placeholder="Title"
                name="title"
                isInvalid={!!formState.errors.title}
                errorMessage={formState.errors.title?.join(', ')}
              ></Input>
              <Textarea
                label="content"
                labelPlacement="outside"
                placeholder="Describe your Post"
                name="content"
                isInvalid={!!formState.errors.content}
                errorMessage={formState.errors.content?.join(', ')}
              />
              {formState.errors._form && (
                <p className="bg-red-200 border rounded border-red-400 p-2">
                  {formState.errors._form.join(', ')}
                </p>
              )}
              <FormButton>Save</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
