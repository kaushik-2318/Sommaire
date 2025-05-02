import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-gray-200/20 px-4 py-4 sm:p-2 md:px-12 md:py-12 lg:px-24">
      <div className="flex">
        <div className="font-logo mr-auto mb-6 flex flex-col items-center space-y-4 space-x-4 pt-4 text-3xl text-black outline-none md:mb-0 dark:text-white">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>KV</AvatarFallback>
          </Avatar>
          <div className="mr-auto text-base text-gray-400 outline-none lg:text-lg text-center">
            Made by
            <span className="px-1 underline underline-offset-4">
              Kaushik Verma
            </span>
            🧡
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row lg:gap-16">

          <div>
            <h4 className='mb-2 font-bold text-gray-600 uppercase dark:text-white'>Navigation</h4>
            <ul className='text-gray-600 dark:text-gray-500 list-none'>
              <li className='mb-1 hover:underline dark:text-gray-400'>Home</li>
              <li className='mb-1 hover:underline dark:text-gray-400'>Pricing</li>
              <li className='mb-1 hover:underline dark:text-gray-400'>Contact</li>
            </ul>
          </div>



          <div>
            <h4 className='mb-2 font-bold text-gray-600 uppercase dark:text-white'>Legal</h4>
            <ul className='text-gray-600 dark:text-gray-500 list-none'>
              <li className="mb-1"><Link className="hover:underline dark:text-gray-400" href="/privacy-policy" >Privacy Policy</Link></li>
              <li className="mb-1" ><Link className="hover:underline dark:text-gray-400" href="/terms" >Terms & Conditions</Link></li>
              <li className="mb-1"><Link className="hover:underline dark:text-gray-400" href="/refund-policy" >Cancellation & Refund</Link></li>
            </ul>
          </div>


          <div >
            <h4 className="mb-2 font-bold text-gray-600 uppercase dark:text-white">About</h4>
            <ul className='text-gray-600 dark:text-gray-500 list-none'>
              <li className='mb-1'><Link className="hover:underline dark:text-gray-400" href="/contact" >Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-2 lg:flex lg:items-center lg:justify-between text-center">
        <span className="text-sm text-gray-700 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a className="hover:underline dark:text-gray-400" href="/">
            Kaushik Verma
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
