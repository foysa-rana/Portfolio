import { Router } from "express";
import {
  signin,
  signup,
  verify,
  resend,
  resetPasswordEmail,
  passowordReset,
} from "../controllers/authController";

const authRouter = Router();

authRouter.route("/signup").post(signup);
authRouter.route("/signin").post(signin);
authRouter.route("/verify").post(verify);
authRouter.route("/resend").post(resend);
authRouter.route("/reset/email").post(resetPasswordEmail);
authRouter.route("/reset/resetpassword").post(passowordReset);

export default authRouter;
