import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activities.findMany({
    select: {
      id: true,
      title: true,
      vacancies: true,
      startsAt: true,
      endsAt: true,
      day: true,
      Places: {
        select: {
          name: true
        }
      }
    },
  });
}

async function findUserActivities(userId: number) {
  return prisma.userActivities.findMany({
    where: {
      userId,
    },
    select: {
      activityId: true
    }
  });
}

async function registerInActivity(userId: number, activityId: number) {
  return prisma.userActivities.create({
    data: {
      userId,
      activityId
    }
  });
}

const activityRepository = {
  findAllActivities,
  findUserActivities,
  registerInActivity
};

export default activityRepository;
