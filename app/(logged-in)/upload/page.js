import BgGradient from '@/components/common/bg-gradient';
import UploadHeader from '@/components/upload/upload-header';
import UploadForm from '@/components/upload/upload-form';
import { currentUser } from '@clerk/nextjs/server';
import { hasReachedUploadLimit } from '@/lib/user';
import { redirect } from 'next/navigation';
import { MotionDiv } from '@/components/common/motion-wrapper';
import { containerVariants } from '@/utils/constants';

export const maxDuration = 60;

export default async function page() {
  const user = await currentUser();

  if (!user?.id) {
    redirect('/sign-in');
  }

  const userId = user?.id;

  const { hasReachedLimit } = await hasReachedUploadLimit(userId);

  if (hasReachedLimit) {
    redirect('/dashboard');
  }

  return (
    <section className="min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants} initial={'hidden'} animate={'visible'} viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
}
