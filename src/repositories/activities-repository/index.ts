import { prisma } from "@/config";
import { Activity, userActivity } from "@/services/activities-service";

async function findAllActivities(): Promise<Activity[] | []> {
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

async function findActivityById(id: number): Promise<Activity | undefined> {
  return prisma.activities.findUnique({
    where:{
      id
    },
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
      activityId: true,
      startsAt: true,
      endsAt: true
    }
  });
}

async function registerInActivity(params: userActivity) {
  const {userId, activityId, startsAt, endsAt} = params;

  return prisma.userActivities.create({
    data: {
      userId,
      activityId,
      startsAt,
      endsAt
    }
  });
}

const activityRepository = {
  findAllActivities,
  findUserActivities,
  findActivityById,
  registerInActivity
};

export default activityRepository;
