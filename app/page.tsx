'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FRIENDS_DATA } from '@/app/data/friends';

const FRIENDS = Object.keys(FRIENDS_DATA).map(key => FRIENDS_DATA[key].displayName);

export default function Home() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }

    // Check if name matches one of the friends
    const matchedFriend = FRIENDS.find(
      friend => friend.toLowerCase() === trimmedName.toLowerCase()
    );

    if (matchedFriend) {
      router.push(`/friend/${matchedFriend.toLowerCase()}`);
    } else {
      setError('Sorry, I don\'t recognize that name. Please check and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-christmas-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-christmas-red rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-christmas-green rounded-full opacity-10"></div>
      <div className="absolute top-1/3 right-5 w-16 h-16 bg-christmas-red rounded-full opacity-5"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black bg-gradient-to-r from-christmas-red via-christmas-green to-christmas-red bg-clip-text text-transparent mb-4 leading-tight">
            Hey, Beautiful!
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-6">
            A little love letter from me to you
          </p>
          <div className="bg-green-50 rounded-2xl p-6 mb-8 inline-block">
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
            I've created a little space, just for you. A note to a friend who made this year brighter. Thank you for being in my life, and here’s to even more wins, laughter and friendship in the new year!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-xs font-black text-christmas-green uppercase tracking-wider mb-3">
              Enter your name to get started
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="What's your name?"
              className="w-full px-6 py-4 text-lg rounded-full border-3 border-christmas-green focus:outline-none focus:border-christmas-red focus:ring-4 focus:ring-christmas-red focus:ring-opacity-30 bg-white transition-all placeholder-gray-400"
            />
          </div>

          {error && (
            <p className="text-christmas-red text-sm font-semibold text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-christmas-red hover:bg-red-700 text-white font-black py-4 rounded-full transition-all duration-200 text-lg transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Let's Go 🎄
          </button>
        </form>


      </div>
    </div>
  );
}
