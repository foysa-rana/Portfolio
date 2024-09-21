import { Router } from "express";
import { createEducation, deleteEducation, getAllEducation, getEducation, updateEducation } from "../controllers/educationController";

const educationRouter = Router();

educationRouter.route("/").get(getAllEducation).post(createEducation);
educationRouter.route("/:id").get(getEducation).patch(updateEducation).delete(deleteEducation)

export default educationRouter;