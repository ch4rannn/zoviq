// ==================================
// Not Found (404) Page
// ==================================
// The custom 404 error page displayed when a route doesn't exist.

import Link from 'next/link';
import Button from '@/components/ui/Button';


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter text-gray-100 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        PAGE NOT FOUND
      </h2>
      <p className="text-base text-gray-500 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          BACK TO HOME
        </Button>
      </Link>
    </div>
  );
}
