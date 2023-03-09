import { prisma, redis } from "@/config";
import { RedisCommandArgument } from "@redis/client/dist/lib/commands";

async function eventCache(key: RedisCommandArgument) {
  return redis.get(key);
}

async function findFirst() {
  return prisma.event.findFirst();
}

const eventRepository = {
  findFirst,
  eventCache
};

export default eventRepository;
