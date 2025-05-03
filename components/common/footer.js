import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-gray-200/20 px-4 py-4 sm:p-2 md:px-12 md:py-12 lg:px-24">
      <div className="flex">
        <div className="font-logo mr-auto mb-6 flex flex-col items-center space-y-4 space-x-4 pt-4 text-3xl text-black outline-none md:mb-0 dark:text-white">

          <Image src={'/image.png'} width={120} height={120} alt="Kaushik Verma Picture" className="rounded-full w-16 lg:w-24 border-solid border-2 border-gray-300 border-opacity-30 p-0.5 shadow-2xl self-center" style={{ color: 'transparent' }} />

          <div className="mr-auto text-base text-gray-400 outline-none lg:text-lg text-center">
            Made by
            <span className="px-1 underline underline-offset-4">
              <Link target='blank' href='https://kaushikverma.me/'>
                Kaushik Verma
              </Link>
            </span>
            🧡
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row lg:gap-16">

          <div>
            <h4 className='mb-2 font-bold text-gray-600 uppercase dark:text-white'>Navigation</h4>
            <ul className='text-gray-600 dark:text-gray-500 list-none'>
              <li className='mb-1  dark:text-gray-400'>

                <Link href='/'>
                  Home
                </Link>
              </li>
              <li className='mb-1  dark:text-gray-400'>

                <Link href='/#pricing'>
                  Pricing
                </Link>
              </li>
              <li className='mb-1  dark:text-gray-400'>

                <Link href='/contact'>
                  Contact
                </Link>
              </li>
              <li className='mb-1  dark:text-gray-400'>

                <Link href='/subscription'>
                  Subscription
                </Link>
              </li>
            </ul>
          </div>



          <div>
            <h4 className='mb-2 font-bold text-gray-600 uppercase dark:text-white'>Legal</h4>
            <ul className='text-gray-600 dark:text-gray-500 list-none'>
              <li className="mb-1"><Link className=" dark:text-gray-400" href="/privacy-policy" >Privacy Policy</Link></li>
              <li className="mb-1" ><Link className=" dark:text-gray-400" href="/terms" >Terms & Conditions</Link></li>
              <li className="mb-1"><Link className=" dark:text-gray-400" href="/refund-policy" >Cancellation & Refund</Link></li>
            </ul>
          </div>


          <div >
            <h4 className="mb-2 font-bold text-gray-600 uppercase dark:text-white">About</h4>
            <ul className='text-gray-600 dark:text-gray-500 list-none'>
              <li className='mb-1'><Link className=" dark:text-gray-400" href="/contact" >Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-2 lg:flex lg:items-center lg:justify-between ">
        <span className="text-sm text-gray-700 sm:text-center dark:text-gray-400 text-center w-full">
          © 2025{" "}
          <Link target='blank' className="underline dark:text-gray-400" href="https://kaushikverma.me/">
            Kaushik Verma
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
