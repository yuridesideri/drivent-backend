import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsWithRooms, getAllHotelsWithRooms } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/all", getAllHotelsWithRooms)
  .get("/:hotelId", getHotelsWithRooms);

export { hotelsRouter };
