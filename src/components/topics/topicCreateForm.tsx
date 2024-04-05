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

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {}
  });

  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input
                label="Name"
                labelPlacement="outside"
                placeholder="Name"
                name="name"
                isInvalid={!!formState.errors.name}
                errorMessage={formState.errors.name?.join(', ')}
              ></Input>
              <Textarea
                label="Description"
                labelPlacement="outside"
                placeholder="Describe your topic"
                name="description"
                isInvalid={!!formState.errors.description}
                errorMessage={formState.errors.description?.join(', ')}
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
