import React from 'react';
import { Arvo } from 'next/font/google';
import Link from 'next/link';

const arvo = Arvo({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function NotFound() {
  return (
    <section
      className={`bg-[#fff] ${arvo.className} flex min-h-screen flex-col items-center justify-start pt-10`}
    >
      <h1 className="text-center text-[80px] font-extralight">404</h1>
      <div className="h-[400px] w-full bg-[url('/not_found.gif')] bg-center bg-no-repeat" />
      <div className="mt-[-50px] flex flex-col items-center justify-center">
        <h3 className="h2">Look like you're lost</h3>
        <p>the page you are looking for not avaible!</p>
        <Link
          href="/"
          className="mx-0 my-[20px] inline-block rounded-xl bg-rose-500 px-[20px] py-[10px] text-white"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
}
