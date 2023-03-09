import { createClient, RedisClientType } from "redis";

export let redis: RedisClientType;
export async function connectRedis() {
  redis = createClient({
    url: process.env.REDIS_URL
  });

  await redis.connect();
}

export async function disconnectRedis() {
  await redis?.disconnect();
}
