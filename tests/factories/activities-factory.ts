import { prisma } from "@/config";
import faker from "@faker-js/faker";

export function registerInActivity(userId: number, activityId: number, startsAt: string, endsAt: string, day:Date) {
  return prisma.userActivities.create({
    data: {
      userId,
      day,
      activityId,
      startsAt,
      endsAt
    }
  });
}

export async function createActivity() {
  const places = await createPlaces();

  return prisma.activities.create({
    data: {
      title: "Minecraft: montando o PC ideal",
      vacancies: 10,
      startsAt: "9:00",
      endsAt: "10:00",
      day: new Date(2022, 2, 18, 0),
      placeId: places.id
    }
  });
}

export function createPlaces() {
  return prisma.places.create({
    data: {
      name: "Auditório Lateral"
    }
  });
}
