import { itemVariants } from '@/utils/constants';
import { MotionDiv } from '../common/motion-wrapper';
import { Badge } from '../ui/badge';
import { Sparkles } from 'lucide-react';

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <MotionDiv variants={itemVariants} className="animate-gradient-x group relative overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 p-[1px]">
        <Badge
          variant={'secondary'}
          className="relative rounded-full bg-white px-6 py-2 text-base font-medium transition-colors group-hover:bg-gray-50"
        >
          <Sparkles className="mr-2 h-12 w-12 animate-pulse text-rose-600" />
          <p className="text-base">AI-Powered Content Creation</p>
        </Badge>
      </MotionDiv>

      <MotionDiv variants={itemVariants} className="text-3xl font-bold tracking-tighter text-gray-900 capitalize sm:text-4xl">
        Start Uploading{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDF's</span>{' '}
          <span
            className="animate-rotate absolute inset-0 rounded-lg bg-rose-200/50"
            aria-hidden="true"
          ></span>
        </span>{' '}
      </MotionDiv>


      <MotionDiv variants={itemVariants} className="mt-2 max-w-2xl text-center text-xl leading-8 text-gray-600">
        <p>Upload your PDF and let our Al do the magic!✨</p>
      </MotionDiv>

    </div>
  );
}
