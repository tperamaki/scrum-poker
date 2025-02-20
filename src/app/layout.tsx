import { Analytics } from '@vercel/analytics/react';
import { randomUUID } from 'crypto';
import Link from 'next/link';
import './globals.css';
import { NewGameLink } from '@/components/Buttons';

export const metadata = {
  title: 'Scrum Poker',
  description: 'Scrum poker for Scrum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const newGameId = randomUUID();
  return (
    <html lang="en">
      <head>
        <meta name="background-color" content="#262626" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="manifest.json"></link>
      </head>
      <body className="bg-neutral-300 dark:bg-neutral-800 dark:text-white m-5">
        <nav className="flex gap-1">
          <div className="flex-1">
            <Link
              className="p-2 rounded-sm border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
              href="/"
            >
              Home
            </Link>
          </div>
          <div className="flex-initial">
            <h1 className="text-xl">Scrum poker</h1>
          </div>
          <div className="flex-1 text-right">
            <NewGameLink className="p-2 rounded-sm border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out">
              Create new
            </NewGameLink>
          </div>
        </nav>
        <div>{children}</div>
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-neutral-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-neutral-800 dark:border-neutral-600">
          <p>
            Found an issue? Contribute on{' '}
            <Link
              className="underline hover:text-red-800 dark:hover:text-red-200"
              href="https://github.com/tperamaki/scrum-poker"
            >
              Github
            </Link>
            !
          </p>
          <p>
            You can also{' '}
            <a
              className="underline hover:text-red-800 dark:hover:text-red-200"
              href="https://github.com/sponsors/tperamaki"
            >
              sponsor me on Github
            </a>
            !
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
