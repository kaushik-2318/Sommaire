import React from 'react'
import { MotionDiv } from '../common/motion-wrapper';
import { listVariants } from '@/utils/constants';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import PaymentButton from './payment-button';
import { currentUser } from '@clerk/nextjs/server';


export default async function PricingCardPro({ name, description, items, id, price }) {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    return (
        <MotionDiv variants={listVariants} whileHover={{ scale: 1.02 }} className="relative w-full max-w-lg duration-300 hover:scale-105 hover:transition-all">
            <div
                className={cn(
                    'relative z-10 flex h-full flex-col gap-4 rounded-2xl border-[1px] border-gray-500/20 p-8 lg:gap-8',
                    id === 'pro' && 'gap-5 border-2 border-rose-500'
                )}
            >
                <MotionDiv variants={listVariants} className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-lg font-bold capitalize lg:text-xl">{name}</p>
                        <p className="text-base-content/80 mt-2">{description}</p>
                    </div>
                </MotionDiv>

                <MotionDiv variants={listVariants} className="flex gap-2">
                    <p className="text-5xl font-extrabold tracking-tight">₹ {price}</p>
                    <div className="mb-[5px] flex flex-col justify-end">
                        <p className="text-xs">/month</p>
                    </div>
                </MotionDiv>

                <MotionDiv variants={listVariants} className="flex-1 space-y-2.5 text-base leading-relaxed">
                    {items.map((item, idx) => (
                        <li className="flex items-center gap-2" key={idx}>
                            <CheckIcon size={18} />
                            <span>{item}</span>
                        </li>
                    ))}
                </MotionDiv>

                <MotionDiv variants={listVariants} className="flex w-full justify-center space-y-2">
                    <PaymentButton email={email} razorpayKey={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID} />
                </MotionDiv>
            </div>
        </MotionDiv>
    );
}
