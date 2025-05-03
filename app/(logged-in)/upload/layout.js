import UpgradeRequired from '@/components/common/upgrade-required';
import { hasReachedUploadLimit } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

export default async function Layout({ children }) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const uploadLimit = await hasReachedUploadLimit(user?.id);

  if (uploadLimit) {
    return <UpgradeRequired />;
  }

  return <>{children}</>;
}
