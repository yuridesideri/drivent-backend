import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getActivities, createUserActivity } from "@/controllers";
import { createUserActivitySchema } from "@/schemas/activities-schema";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .post("/", validateBody(createUserActivitySchema), createUserActivity);

export { activitiesRouter };
