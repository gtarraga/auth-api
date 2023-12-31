import { Router } from "express";
import { UserController } from "../controller/UserController"
import { checkJwt } from '../middlewares/checkJwt';


const router = Router();

//Get all users
router.get(
    "/",
    [checkJwt],
    UserController.listAll
);

// Get one user
router.get(
  "/:email",
  [checkJwt],
  UserController.getOne
);

//Create a new user
router.post(
    "/",
    [checkJwt],
    UserController.newUser
);

//Edit one user
router.patch(
  "/:id",
  [checkJwt],
  UserController.editUser
);

//Delete one user
router.delete(
  "/:email",
  [checkJwt],
  UserController.deleteUser
);

export default router;