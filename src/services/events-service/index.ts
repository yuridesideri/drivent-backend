import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event } from "@prisma/client";
import dayjs from "dayjs";

async function getFirstEvent(): Promise<GetFirstEventResult | string> {
  const cacheKey = "event";

  const eventCache = await eventRepository.eventCache(cacheKey);

  if (!eventCache) {
    const event = await eventRepository.findFirst();
    if (!event) throw notFoundError();

    await eventRepository.setEventCache(cacheKey, exclude(event, "createdAt", "updatedAt"))

    return exclude(event, "createdAt", "updatedAt");
  }

  return eventCache;
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
