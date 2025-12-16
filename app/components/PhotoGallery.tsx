'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PhotoGalleryProps {
  friendName: string;
  layout?: 'inline' | 'grid' | 'scattered';
  maxPhotos?: number;
}

export function PhotoGallery({ friendName, layout = 'scattered', maxPhotos }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch photos from the public/photos/{friendName} folder
    const fetchPhotos = async () => {
      try {
        // We'll use a simple approach: try to load photos with expected naming patterns
        // Since we can't directly list directory contents on the client, we'll rely on
        // a data structure or load them dynamically from Next.js API
        const response = await fetch(`/api/photos?friend=${encodeURIComponent(friendName)}`);
        if (response.ok) {
          const data = await response.json();
          const photoPaths = data.photos || [];
          setPhotos(maxPhotos ? photoPaths.slice(0, maxPhotos) : photoPaths);
        }
      } catch (error) {
        console.error('Failed to load photos:', error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [friendName, maxPhotos]);

  if (loading || photos.length === 0) {
    return null;
  }

  if (layout === 'inline') {
    return (
      <div className="my-8 flex flex-wrap gap-3">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
          >
            <Image
              src={photo}
              alt={`Photo ${idx + 1}`}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        ))}
      </div>
    );
  }

  if (layout === 'scattered') {
    // Arrange photos randomly throughout
    const positions = [
      'float-right ml-6 mb-4 w-40 h-40',
      'float-left mr-6 mb-4 w-32 h-32',
      'float-right ml-6 mb-4 w-36 h-36',
      'float-left mr-6 mb-4 w-40 h-40',
      'float-right ml-6 mb-4 w-32 h-32',
      'float-left mr-6 mb-4 w-36 h-36',
    ];

    return (
      <div className="space-y-0">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className={`${positions[idx % positions.length]} relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
          >
            <Image
              src={photo}
              alt={`Photo ${idx + 1}`}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    );
  }

  // Grid layout
  return (
    <div className="my-8 grid grid-cols-3 gap-4">
      {photos.map((photo, idx) => (
        <div
          key={idx}
          className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
        >
          <Image
            src={photo}
            alt={`Photo ${idx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      ))}
    </div>
  );
}
