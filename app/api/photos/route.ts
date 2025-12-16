import { readdirSync } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const friend = searchParams.get('friend');

  if (!friend) {
    return NextResponse.json({ error: 'Friend name required' }, { status: 400 });
  }

  try {
    const photosDir = join(process.cwd(), 'public', 'photos', friend);
    const files = readdirSync(photosDir).filter((file) => {
      const ext = file.toLowerCase();
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(ext);
    });

    const photos = files.map((file) => `/photos/${friend}/${file}`);

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error reading photos:', error);
    return NextResponse.json({ photos: [] });
  }
}
