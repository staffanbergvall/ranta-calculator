import { CSSProperties } from 'react';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'chart' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

export default function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
  count = 1,
}: SkeletonProps) {
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'text':
        return {
          width: width || '100%',
          height: height || '1em',
          borderRadius: '4px',
        };
      case 'circular':
        return {
          width: width || '40px',
          height: height || '40px',
          borderRadius: '50%',
        };
      case 'card':
        return {
          width: width || '100%',
          height: height || '200px',
          borderRadius: '12px',
        };
      case 'chart':
        return {
          width: width || '100%',
          height: height || '400px',
          borderRadius: '8px',
        };
      default:
        return {
          width: width || '100%',
          height: height || '40px',
          borderRadius: '4px',
        };
    }
  };

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton ${className}`}
      style={getVariantStyles()}
    />
  ));

  return count > 1 ? (
    <div className="skeleton-container">
      {skeletons}
    </div>
  ) : (
    skeletons[0]
  );
}

// Specialized skeleton components for common use cases
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton-card ${className}`}>
      <div className="flex items-start gap-4 mb-4">
        <Skeleton variant="circular" width="60px" height="60px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <SkeletonText lines={4} />
    </div>
  );
}

export function SkeletonChart({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 ${className}`}>
      <div className="mb-4">
        <Skeleton variant="text" width="200px" height="24px" />
        <Skeleton variant="text" width="300px" height="16px" className="mt-2" />
      </div>
      <Skeleton variant="chart" />
    </div>
  );
}

export function SkeletonMetricCard({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton-metric-card ${className}`}>
      <Skeleton variant="text" width="120px" height="14px" />
      <Skeleton variant="text" width="80px" height="32px" className="mt-2" />
    </div>
  );
}
