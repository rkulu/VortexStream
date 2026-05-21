'use client';

import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-white/20 border-t-[#00f4fe] ${sizeClasses[size]}`}></div>
    </div>
  );
}

interface LoadingCardProps {
  count?: number;
}

export function LoadingCard({ count = 1 }: LoadingCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[2/3] rounded-[20px] bg-white/5 border border-white/5 mb-3"></div>
          <div className="h-4 bg-white/5 rounded mb-2"></div>
          <div className="h-3 bg-white/5 rounded w-3/4"></div>
        </div>
      ))}
    </>
  );
}

interface LoadingSectionProps {
  title?: string;
  count?: number;
}

export function LoadingSection({ title = 'Loading...', count = 5 }: LoadingSectionProps) {
  return (
    <section>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            {title}
          </h2>
          <LoadingSpinner />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        <LoadingCard count={count} />
      </div>
    </section>
  );
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-on-surface-variant">Loading content...</p>
      </div>
    </div>
  );
}