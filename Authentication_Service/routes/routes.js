import express from "express"
import AuthRequestMiddlewares from "../middlewares/authRequestMiddleware.js"
import UserController from "../controllers/userController.js";
import InfoController from "../controllers/infoController.js"

const router = express.Router();

router.get("/info", AuthRequestMiddlewares.checkAuth, InfoController.info)

router.post(
  "/user/signup",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signup
);

router.post(
  "/user/signin",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signin
);

// If u are a logged-in admin then only u can add a role to a user - Authorization
router.post(
  "/user/role",
  AuthRequestMiddlewares.checkAuth,
  AuthRequestMiddlewares.isAdmin,
  AuthRequestMiddlewares.validateAddRoleRequest,
  UserController.addRoleToUser
);


export default router;