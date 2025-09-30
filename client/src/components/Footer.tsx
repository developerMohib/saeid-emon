import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col md:space-y-10 justify-center m-10">
      {/* Copyright */}
      <p className="text-center text-xs text-seBlack font-medium">
        &copy; {currentYear} Saeid Emon. All rights reserved. Powered by <Link href={"https://mohibullah-mohim.vercel.app"} target="_blank" className="text-green-400 hover:text-seRed hover:underline" >Mohib</Link>
      </p>
    </footer>
  );
};

export default Footer;