import Joi from "joi";

export const createUserActivitySchema = Joi.object<{activityId: number}>({
  activityId: Joi.number().required(),
});
