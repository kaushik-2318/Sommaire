import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';

export default function SummaryHeader({ title, createdAt, readingTime }) {
  return (
    <div className="mb-4 flex justify-between gap-4">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant={'secondary'}
            className="hover:shadow:md relative rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-rose-500 shadow-xs backdrop-blur-xs transition-all duration-200 hover:bg-white/90"
          >
            <Sparkles className="mr-1.5 h-4 w-4 text-rose-500" />
            AI Summary
          </Badge>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-rose-500" />
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-rose-500" />
            {readingTime} min read
          </div>
        </div>
        <h1 className="text-2xl font-bold lg:text-4xl lg:tracking-tight">
          <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>

      <div className="self-start">
        <Link href="/dashboard">
          <Button
            variant={'link'}
            size={'sm'}
            className="group hover:shadow:md flex items-center gap-1 rounded-full border border-rose-100/30 bg-rose-100 px-2 text-rose-500 shadow-xs backdrop-blur-xs transition-all duration-200 hover:bg-white/80 hover:no-underline sm:gap-2 sm:px-3"
          >
            <ChevronLeft className="h-3 w-3 text-rose-500 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
            <span className="text-muted-foreground text-xs font-medium sm:text-sm">
              Back <span className="hidden sm:inline">to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
