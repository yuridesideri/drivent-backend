import activityRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, cannotListActivities, conflictError } from "@/errors";
import { Activities, UserActivities } from "@prisma/client";

async function listActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw cannotListActivities();
  }
}

async function getActivities(userId: number) {
  await listActivities(userId);

  const activities = await activityRepository.findAllActivities();

  const userActivities = await activityRepository.findUserActivities(userId);

  const activitiesWithUser = activities.map((activity: Activity) => {
    for(const userActivity of userActivities) {
      if(activity.id === userActivity.activityId) return { ...activity, userSubscribed: true };
    }
    
    return {
      ...activity,
      userSubscribed: false
    };
  });

  return activitiesWithUser;
}

async function createUserActivity(userId: number, activityId: number) {
  await listActivities(userId);
  const activity = await activityRepository.findActivityById(activityId);

  const userActivities = await activityRepository.findUserActivities(userId);

  userActivities.map((item: userActivity) => {
    if(item.startsAt === activity.startsAt) throw conflictError("Usuário já registrado em um evento neste horário");
  });
  
  const createdActivity = await activityRepository.registerInActivity(userId, activityId, activity.startsAt, activity.endsAt);

  await activityRepository.updateVacancies(activityId);

  return createdActivity;
}

export type Activity = Omit<Activities, "placeId" | "createdAt" | "updatedAt">;

export type userActivity = Omit<UserActivities, "id" | "createdAt" | "updatedAt">;

const activityService = {
  getActivities,
  createUserActivity,
  listActivities,
};

export default activityService;
