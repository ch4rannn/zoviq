// ==================================
// Product Image Gallery
// ==================================
// Displays the main product image and a grid of thumbnails.
// Handles clicking thumbnails to change the main image.

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ShopifyImage } from '@/types/shopify';

interface ProductImageGalleryProps {
  images: ShopifyImage[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full bg-gray-50 overflow-hidden">
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || 'Product image'}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails (only show if there's more than 1 image) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                'relative aspect-[3/4] bg-gray-50 overflow-hidden transition-all',
                selectedImageIndex === index
                  ? 'ring-1 ring-offset-2 ring-primary border-transparent'
                  : 'hover:opacity-75'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.altText || `Product thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 10vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
