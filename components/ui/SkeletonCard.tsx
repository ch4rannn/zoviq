// ==================================
// Skeleton Card Component
// ==================================
// Placeholder shown while product data is loading.
// Mimics the shape of a ProductCard with a pulsing animation.
// Usage: <SkeletonCard /> (usually rendered in a grid)

export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      {/* Image placeholder — matches 3:4 aspect ratio of product images */}
      <div className="aspect-[3/4] bg-gray-200 mb-3" />

      {/* Product name placeholder */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

      {/* Price placeholder */}
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  );
}
