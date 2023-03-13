import { prisma, redis } from "@/config";
import { RedisCommandArgument } from "@redis/client/dist/lib/commands";
import { Event } from "@prisma/client";

async function eventCache(key: RedisCommandArgument) {
  return redis.get(key);
}

async function setEventCache(key: RedisCommandArgument, event: Omit<Event, "createdAt" | "updatedAt">) {
  redis.set(key, JSON.stringify(event));
  //event: driven
  return;
}

async function findFirst() {
  return prisma.event.findFirst();
}

const eventRepository = {
  findFirst,
  eventCache,
  setEventCache
};

export default eventRepository;
