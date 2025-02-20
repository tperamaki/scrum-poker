import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redisUrlString = process.env.REDIS_URL_STRING ?? 'redis://localhost:6379';

const REDIS_EXPIRE_MS = 15 * 60;

interface Params {
  params: Promise<{ id: string; name: string }>;
}

const setValueForPlayerInGame = async (
  gameId: string,
  playerName: string,
  value: number | undefined,
  redis: Redis
) => {
  const game = JSON.parse((await redis.get(`game-${gameId}`)) ?? '{}');
  game[playerName] = value;
  game['__lastUpdated'] = Date.now();
  await redis.set(
    `game-${gameId}`,
    JSON.stringify(game),
    'EX',
    REDIS_EXPIRE_MS
  );
  return NextResponse.json({});
};

// Join a game
export async function POST(request: Request, props: Params) {
  const params = await props.params;
  const redis = new Redis(redisUrlString);
  await setValueForPlayerInGame(params.id, params.name, -1, redis);
  await redis.quit();
  return NextResponse.json({});
}

// Vote a value
export async function PUT(request: Request, props: Params) {
  const params = await props.params;
  const redis = new Redis(redisUrlString);
  const res = await request.json();
  await setValueForPlayerInGame(params.id, params.name, res.value, redis);
  await redis.quit();
  return NextResponse.json({});
}

// Leave a game or delete a player from game
export async function DELETE(request: Request, props: Params) {
  const params = await props.params;
  const redis = new Redis(redisUrlString);
  await setValueForPlayerInGame(params.id, params.name, undefined, redis);
  await redis.quit();
  return NextResponse.json({});
}
