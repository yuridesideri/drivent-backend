import { prisma } from "@/config";

async function findAllActivities(){
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

async function findActivityById(id: number){
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

async function registerInActivity(userId: number, activityId: number, startsAt: string, endsAt: string) {

  return prisma.userActivities.create({
    data: {
      userId,
      activityId,
      startsAt,
      endsAt
    }
  });
}

async function updateVacancies(id: number) {
  return prisma.activities.update({
    where: {
      id
    },
    data: {
      vacancies: {
        decrement: 1
      }
    }
  });
}


const activityRepository = {
  findAllActivities,
  findUserActivities,
  findActivityById,
  registerInActivity,
  updateVacancies
};

export default activityRepository;
