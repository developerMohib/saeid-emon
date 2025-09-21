
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col space-y-10 justify-center m-10">
      {/* Copyright */}
      <p className="text-center text-gray-700 font-medium">
        &copy; {currentYear} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;