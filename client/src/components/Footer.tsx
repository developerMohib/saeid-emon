import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  // ✅ Social links in JSON format
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/saeid.emon29",
      icon: (
        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3h2v3h-1c-1 0-1 .5-1 1v1h3l-1 3h-2v7A10 10 0 0022 12z" />
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/_emon_29",
      icon: (
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z" />
      ),
    },
    {
      name: "Twitter",
      href: "https://x.com/emon_saeid",
      icon: (
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.26 4.26 0 0016.11 4c-2.36 0-4.27 1.91-4.27 4.27 0 .33.04.66.1.97C7.7 8.99 4.07 7.13 1.64 4.16a4.26 4.26 0 00-.58 2.15c0 1.48.75 2.79 1.88 3.55a4.22 4.22 0 01-1.93-.53v.05c0 2.07 1.47 3.8 3.42 4.19a4.3 4.3 0 01-1.93.07c.55 1.71 2.13 2.96 4 2.99A8.58 8.58 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.72 8.72 0 0024 5.5a8.52 8.52 0 01-2.54.7z" />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mohibullah-mohim",
      icon: (
        <path d="M4.98 3.5a2.5 2.5 0 112.5 2.5 2.5 2.5 0 01-2.5-2.5zM3 8h4v12H3zm6 0h3.8v1.75h.05a4.15 4.15 0 013.7-2.05c3.95 0 4.7 2.6 4.7 5.95V20h-4v-5.5c0-1.3-.02-3-1.85-3-1.86 0-2.15 1.45-2.15 2.9V20h-4z" />
      ),
    },
  ];

  return (
    <footer className="flex flex-col items-center md:space-y-10 justify-center pb-10">
      {/* ✅ Map social links */}
      <div className="flex space-x-4">
        {socialLinks?.map(({ name, href, icon }) => (
          <Link
            key={name}
            href={href}
            target="_blank"
            aria-label={name}
            className="w-10 h-10 rounded-full bg-seGray/20 flex items-center justify-center hover:bg-amber-500 transition-colors hover:-translate-y-0.5 duration-700"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {icon}
            </svg>
          </Link>
        ))}
      </div>

      {/* ✅ Copyright */}
      <p className="text-center text-sm text-seBlack font-medium">
        &copy; {currentYear} All rights reserved by{" "}
        <span className="font-semibold">Saeid Emon</span>. Powered by{" "}
        <Link
          href="https://mohibullah-mohim.vercel.app"
          target="_blank"
          className="text-green-400 hover:text-seRed hover:underline"
        >
          Mohib
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
