
import { Router, Request, Response } from "express";
import flightsController from "./flights";
import usersController from './users';

const router = Router();
// *change here to address routes*

router.use("/flights", flightsController);
router.use("/users", usersController);

export default router;