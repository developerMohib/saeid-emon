import Image from 'next/image';
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
         <footer className="flex flex-col space-y-10 justify-center m-10">
      {/* Navigation Links */}
      <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <a className="hover:text-gray-900" href="#">
          Home
        </a>
        <a className="hover:text-gray-900" href="#">
          About
        </a>
        <a className="hover:text-gray-900" href="#">
          Services
        </a>
        <a className="hover:text-gray-900" href="#">
          Media
        </a>
        <a className="hover:text-gray-900" href="#">
          Gallery
        </a>
        <a className="hover:text-gray-900" href="#">
          Contact
        </a>
      </nav>

      {/* Social Icons */}
      <div className="flex justify-center space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
            alt="Facebook" height={500} width={500} className='w-8 h-8'
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image height={500} width={500}
            src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
            alt="LinkedIn" className='w-8 h-8'
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image height={500} width={500}
            src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
            alt="Instagram" className='w-8 h-8'
          />
        </a>
        <a
          href="https://messenger.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image height={500} width={500}
            src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png"
            alt="Messenger" className='w-8 h-8'
          />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image height={500} width={500}
            src="https://img.icons8.com/fluent/30/000000/twitter.png"
            alt="Twitter" className='w-8 h-8'
          />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-700 font-medium">
        &copy; {currentYear} All rights reserved.
      </p>
    </footer>
    );
};

export default Footer;