import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-christmas-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black text-christmas-red mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">Oops! We couldn't find what you're looking for.</p>
        <Link
          href="/"
          className="inline-block bg-christmas-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
