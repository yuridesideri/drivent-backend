import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';
import httpStatus from 'http-status';

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const activities = await activitiesService.getActivities(Number(userId));
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotListActivities') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createUserActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;

  try {
    const userActivity = await activitiesService.createUserActivity(Number(userId), Number(activityId));

    return res.status(httpStatus.OK).send(userActivity);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotListActivities') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
