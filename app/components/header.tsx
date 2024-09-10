import Link from 'next/link';

export const Header = () => {
  return (
    <header className="h-24 flex items-center text-2xl font-semibold pl-7 mb-4 bg-indigo-300">
      <Link href={'/'}>
        <span>Blog</span>
      </Link>
    </header>
  );
};
