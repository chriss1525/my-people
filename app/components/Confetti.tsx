'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export function ConfettiComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={100}
      gravity={0.15}
      recycle={false}
      colors={['#E01E3F', '#0B6623', '#FFFFFF']}
    />
  );
}
