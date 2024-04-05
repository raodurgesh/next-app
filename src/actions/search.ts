'use server';

import paths from '@/paths';
import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
  const term = formData.get('term')?.toString();
  if (!term?.trim()) {
    redirect(paths.homePath());
  }

  redirect(paths.searchPath() + '?term=' + term);
}
