import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redisUrlString = process.env.REDIS_URL_STRING ?? 'redis://localhost:6379';

const REDIS_EXPIRE_MS = 15 * 60;

interface Params {
  params: Promise<{ id: string }>;
}

// Get state for the game
export async function GET(request: Request, props: Params) {
  const params = await props.params;
  const redis = new Redis(redisUrlString);
  const game = JSON.parse((await redis.get(`game-${params.id}`)) ?? '{}');
  await redis.quit();
  return NextResponse.json(game);
}

// Reset game
export async function DELETE(request: Request, props: Params) {
  const params = await props.params;
  const redis = new Redis(redisUrlString);
  const game = JSON.parse((await redis.get(`game-${params.id}`)) ?? '{}');
  const resettedGame = Object.fromEntries(
    Object.entries(game).map(([key, _value]) => [key, -1])
  );
  resettedGame['__lastUpdated'] = Date.now();
  await redis.set(
    `game-${params.id}`,
    JSON.stringify(resettedGame),
    'EX',
    REDIS_EXPIRE_MS
  );
  await redis.quit();
  return NextResponse.json({});
}
