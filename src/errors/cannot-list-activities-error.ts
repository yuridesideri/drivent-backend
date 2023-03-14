import { ApplicationError } from "@/protocols";

export function cannotListActivities(): ApplicationError {
  return {
    name: "CannotListActivities",
    message: "Cannot list the activities!",
  };
}
