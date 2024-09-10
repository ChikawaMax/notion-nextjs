import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="h-10 flex items-center px-7 mt-4 bg-indigo-300 justify-between">
      <span>© 2024 My Blog. All rights reserved.</span>
      <Link href={'/'}>Home</Link>
    </footer>
  );
};
