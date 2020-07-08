
import { Router} from "express";
import flightsController from "./flights";
import usersController from './users';
import hostelsController from "./hostels";

const router = Router();

router.use("/flights", flightsController);
router.use("/users", usersController);
router.use("/hostels", hostelsController);

export default router;