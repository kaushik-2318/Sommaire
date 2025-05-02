import { cn } from '@/lib/utils';
import { ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { containerVariants, itemVariants, pricingPlans } from '@/utils/constants';
import { MotionDiv, MotionSection } from '../common/motion-wrapper';


const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1, x: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
      damping: 20,
      stiffness: 100
    }
  }
}

const Pricingcard = ({ name, description, items, id, price, paymentLink }) => {
  return (
    <MotionDiv variants={listVariants} whileHover={{ scale: 0.2 }} className="relative w-full max-w-lg duration-300 hover:scale-105 hover:transition-all">
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
          <p className="text-5xl font-extrabold tracking-tight">{price}</p>
          <div className="mb-[5px] flex flex-col justify-end">
            {/* <p className="text-xs">/month</p> */}
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
          <Link
            href={paymentLink}
            className={cn(
              'Markdown Export',
              'flex w-full items-center justify-center gap-2 rounded-full border-2 bg-linear-to-r from-rose-800 to-rose-500 py-2 text-white duration-1000 hover:from-rose-500 hover:to-rose-800',
              id === 'pro'
                ? 'border-rose-900'
                : 'border-rose-100 from-rose-400 to-rose-500'
            )}
          >
            Try Now <ArrowRight size={18} />
          </Link>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <MotionSection variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="relative overflow-hidden" id="pricing">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-12 lg:pt-12">
        <MotionDiv variants={itemVariants} className="flex w-full items-center justify-center pb-12">
          <h2 className="mb-8 text-xl font-bold text-rose-500 uppercase">
            Pricing
          </h2>
        </MotionDiv>
        <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          {pricingPlans.map((plan) => (
            <Pricingcard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
