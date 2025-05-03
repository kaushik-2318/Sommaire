import React from 'react'
import BgGradient from './bg-gradient'
import { ArrowRight, Sparkle } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function UpgradeRequired() {
    return (
        <div className='relative min-h-[50vh]'>
            <BgGradient className="from-red-100 via-rose-50 to-orange-200" />
            <div className="container px-8 py-16">
                <div className='flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto'>
                    <div className='flex items-center gap-2 text-rose-500'>
                        <Sparkle className='w-6 h-6' />
                        <span className='text-sm font-medium uppercase tracking-wider'>
                            Premium Feature
                        </span>
                    </div>

                    <h1 className='text-4xl font-bold tracking-tighter bg-linear-to-r from-gray-900  to-gray-600 bg-clip-text text-transparent'>
                        Upgrade Required
                    </h1>
                    <p className='text-lg leading-8 text-gray-600 border-2 border-rose-200 bg-white/50 backdrop-blur-sm rounded-lg p-6 border-dashed max-w-xl'>
                        You need to Upgrade to the Pro Plan to get more uploads.💗
                    </p>
                    <Button asChild className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-700 text-white">
                        <Link href="/#pricing" className="flex gap-2 items-center">
                            View Pricing Plan <ArrowRight className='w-4 g-4' />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
