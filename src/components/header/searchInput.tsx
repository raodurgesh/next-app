'use client';
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';
import { useEffect, useRef } from 'react';
export default function SearchInput() {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);
  const term = searchParams.get('term');

  useEffect(() => {
    if (!term && ref.current) {
      (ref.current as HTMLInputElement).value = '';
      (ref.current as HTMLInputElement).defaultValue = '';
    }
  }, [term]);

  return (
    <div>
      <form action={actions.search}>
        <Input
          ref={ref}
          name="term"
          defaultValue={term || ''}
          type="text"
          placeholder="Search..."
        />
      </form>
    </div>
  );
}
