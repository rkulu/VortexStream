'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';

interface NotFoundProps {
  title?: string;
  message?: string;
  homeLink?: boolean;
  showSearch?: boolean;
}

export function NotFoundComponent({ 
  title = "Page Not Found", 
  message = "The page you're looking for doesn't exist or has been removed.",
  homeLink = true,
  showSearch = true 
}: NotFoundProps) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <div className="glass-panel rounded-2xl p-8 text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <p className="text-on-surface-variant text-sm mb-6">{message}</p>
        
        {showSearch && (
          <div className="mb-6">
            <p className="text-on-surface-variant text-xs mb-3">
              Try searching for what you're looking for:
            </p>
            <Link
              href="/search"
              className="inline-block bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all"
            >
              Search Content
            </Link>
          </div>
        )}
        
        {homeLink && (
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all"
            >
              Go to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="bg-white/10 text-white px-6 py-2 rounded-full font-bold hover:bg-white/20 transition-all"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Server-side component for 404 pages
export function ServerNotFound() {
  return (
    <NotFoundComponent
      title="Content Not Found"
      message="The content you're looking for may have been removed, is temporarily unavailable, or doesn't exist."
      showSearch={true}
    />
  );
}