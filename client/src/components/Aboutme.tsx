"use client"
import { useAuthUser } from '@/hooks/useAuthUser';
import { ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Loader from './Loader';

const Aboutme = () => {

  const { isPending, isError, error, data } = useAuthUser();

  if (isPending) return <Loader />;
  if (isError) return <p>Error: {error?.message}</p>;

  const socials = data[0]?.social;
  const newdata = data[0];

  return (
    <div className='my-10 md:px-0 px-5'>
      <div className=''>
        <h1 className='my-2 uppercase text-seGray text-xs font-semibold'>About Me</h1>
        <p className='text-sm text-seBlack/80 leading-6 tracking-wide'>{newdata.experience}</p>
      </div>

      <div className='my-5 hidden'>
        <Link href={'/resume'} className='flex text-seGray items-center hover:text-seBlack text-sm' >View Full Resume <span> <ChevronRight className='w-4 h-4' /> </span> </Link>
      </div>

      <div className="my-5 mt-10">
         <h1 className='my-2 uppercase text-seGray text-xs font-semibold'>Contact Me</h1>
        <p>
          <Link href="tel:+15878218048" className="text-seBlack/80 hover:underline text-sm">
            Call Me: +1 587-821-8048
          </Link>
        </p>
        <p>
          <Link href="mailto:contact@saeidemon.com" className="text-seBlack/80 hover:underline text-sm">
            Email: contact@saeidemon.com
          </Link>
        </p>
      </div>


      <div className="w-full">
        <h1 className='text-xs uppercase font-semibold text-seGray'>On The Web</h1>
        <ul className="w-full">
          {Object.entries(socials).map(([key, url], index) => (
            <li className="my-2" key={index}>
              <Link
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-between items-center px-4 py-3 rounded-md hover:bg-seGray/20 transition border border-seGray/20"
              >
                <span className="flex gap-2 text-xs font-light capitalize tracking-widest">
                  {key}
                </span>

                <SquareArrowOutUpRight className="text-seGray/80 w-4 h-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Aboutme;