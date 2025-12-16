'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FRIENDS_DATA } from '@/app/data/friends';
import { PhotoGallery } from '@/app/components/PhotoGallery';
import { ConfettiComponent } from '@/app/components/Confetti';

export default function FriendPage() {
  const params = useParams();
  const friendName = params.name as string;
  const friend = FRIENDS_DATA[friendName];
  const [showConfetti, setShowConfetti] = useState(true);
  const thankYouRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  if (!friend) {
    return (
      <div className="min-h-screen bg-christmas-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-christmas-red mb-4">
            Friend not found
          </h1>
          <Link
            href="/"
            className="text-christmas-green underline hover:text-christmas-red"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-christmas-white relative overflow-hidden">
      {showConfetti && <ConfettiComponent />}
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-christmas-green rounded-full opacity-5 blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-christmas-red rounded-full opacity-5 blur-3xl -z-10"></div>

      {/* Navigation */}
      <nav className="flex items-center justify-between max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-christmas-green hover:text-christmas-red transition-colors text-sm font-bold hover:scale-110 active:scale-95"
        >
          ← Back
        </Link>
        <h1 className="text-4xl font-black text-christmas-green">{friend.displayName}</h1>
        <div className="w-12"></div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12 pb-24">
        {/* Archetype Section */}
        <section className="mb-24 relative animate-fade-in">
          <div className="mb-6">
            <span className="inline-block bg-christmas-red text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-4 animate-fade-in-delay-100">
              Who You Are
            </span>
            <h2 className="text-7xl font-black text-christmas-green leading-tight mb-6 animate-fade-in-delay-200">
              {friend.archetype}
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-gray-700 font-medium">
              {friend.archetypeDescription}
            </p>
            <PhotoGallery friendName={friend.displayName} layout="scattered" maxPhotos={2} />
          </div>
          <div className="absolute -right-10 -top-10 w-20 h-20 bg-christmas-red rounded-full opacity-10"></div>
        </section>

        {/* Divider with personality */}
        <div className="my-20 flex items-center gap-4 justify-center">
          <span className="text-4xl">✨</span>
        </div>

        {/* Note Section */}
        <section className="mb-24 relative">
          <div className="mb-6">
            <span className="inline-block bg-christmas-green text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-4">
              A Note From Me
            </span>
            <h2 className="text-5xl font-black text-christmas-red leading-tight mb-6">
              What Being Friends <br /> With You Means
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-gray-700 font-medium">
              {friend.note}
            </p>
            <PhotoGallery friendName={friend.displayName} layout="scattered" maxPhotos={3} />
          </div>
          <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-christmas-green rounded-full opacity-10"></div>
        </section>

        {/* Divider with personality */}
        <div className="my-20 flex items-center gap-4 justify-center">
          <span className="text-4xl">💚</span>
        </div>

        {/* Wish Section */}
        <section className="mb-24 relative">
          <div className="mb-6">
            <span className="inline-block bg-christmas-red text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-4">
              My Wish For You
            </span>
            <h2 className="text-5xl font-black text-christmas-green leading-tight mb-6">
              Looking Ahead to <br /> the New Year
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-gray-700 font-medium">
              {friend.wish}
            </p>
            <PhotoGallery friendName={friend.displayName} layout="scattered" maxPhotos={2} />
          </div>
          <div className="absolute -right-10 top-1/2 w-28 h-28 bg-christmas-red rounded-full opacity-10"></div>
        </section>

        {/* Thank You Section */}
        <section ref={thankYouRef} className="mt-40 pt-20 text-center relative animate-fade-in">
          <div className="inline-block">
            <h2 className="text-6xl font-black animate-scale-in">
              <span className="text-christmas-red">Thank You</span>
              <br />
              <span className="text-christmas-green">For Being My Friend</span>
            </h2>
          </div>
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-christmas-green rounded-full opacity-10"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 mt-12 text-gray-400">
        <p className="text-sm font-semibold">Made with love 💚❤️</p>
      </footer>
    </div>
  );
}
