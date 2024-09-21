import { NextFunction, Request, Response } from "express";
import educationSchema from "../schemas/educationSchema";
import { educationModel } from "../models/educationModel";
import mongoose from "mongoose";

// create education
export const createEducation = async (req: Request,
    res: Response,
    next: NextFunction) => {
        try {
            // validate input fields
            const validatedFields = educationSchema.safeParse(req.body)
            if(!validatedFields.success) {
                const err = validatedFields.error.issues.reduce((acc, curr) => {
                    const {path, message} = curr;
                    return {...acc, [path[0]]: message}
                }, {})
                next({ statusCode: 400, message: err });
                return;
            }
            // creating education
            const education = await educationModel.create({...validatedFields.data, createdBy: req.user.userId})
            // sending response
            res.status(200).json({
                message: { success: "Education Successfully created" },
                education
            })
        } catch (error) {
            next({
                statusCode: 500,
                message: "Getting internal server error while creating education...",
              });
        }
    }
    
// get education
export const getEducation = async (req: Request,
    res: Response,
    next: NextFunction) => {
        try {
            // checking if id is valid
            const validId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (!validId) {
                next({
                    statusCode: 400,
                    message: "There is no education available with this information.",
                });
                return;
            }
            // getting education
            const education = await educationModel.findById(req.params.id)
            // checkeing if education exist 
            if(!education) {
                next({
                    statusCode: 400,
                    message: "There is no education available with this information.",
                });
                return;
            }
            // sending response
            res.status(200).json({education})
        } catch (error) {
            next({
                statusCode: 500,
                message: "Getting internal server error while getting education...",
              });
        }
    }

// getAll education
export const getAllEducation = async (req: Request,
    res: Response,
    next: NextFunction) => {
        try {
            // getting all educations
            const educations = await educationModel.find();
            // sending response
            res.status(200).json({educations})
        } catch (error) {
            next({
                statusCode: 500,
                message: "Getting internal server error while creating education...",
              });
        }
    }


// update education
export const updateEducation = async (req: Request,
    res: Response,
    next: NextFunction) => {
        try {
            // validating input fields
            const validatedFields = educationSchema.safeParse(req.body);
            if(!validatedFields.success) {
                const err = validatedFields.error.issues.reduce((acc, curr) => {
                    const {path, message} = curr;
                    return {...acc, [path[0]]: message}
                }, {})
                next({ statusCode: 400, message: err });
                return;
            }

            const {passingYearFrom, passingYearTo, educationType, institute, instituteLocation, course, point, outOf} = validatedFields.data

            // checking if id is valid
            const validId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (!validId) {
                next({
                    statusCode: 400,
                    message: "There is no education available with this information.",
                });
                return;
            } 

            // checking if education exist
            const isEducationExist = await educationModel.findById(req.params.id)
            if(!isEducationExist) {
                next({
                    statusCode: 400,
                    message: "There is no education available with this information.",
                });
                return;
            }

            // updating education
            isEducationExist.passingYearFrom = passingYearFrom!;
            isEducationExist.passingYearTo = passingYearTo;
            isEducationExist.educationType = educationType;
            isEducationExist.institute = institute;
            isEducationExist.instituteLocation = instituteLocation;
            isEducationExist.course = course;
            isEducationExist.point = point;
            isEducationExist.outOf = outOf
            const updatedEducation = await isEducationExist.save();

             // sending response
            res.status(200).json({updatedEducation})
        } catch (error) {
            next({
                statusCode: 500,
                message: "Getting internal server error while creating education...",
              });
        }
    }

// delete education
export const deleteEducation = async (req: Request,
    res: Response,
    next: NextFunction) => {
        try {
            // checking if id is valid
            const validId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (!validId) {
                next({
                    statusCode: 400,
                    message: "There is no education available with this information.",
                });
                return;
            } 

            // checking if education exist
            const isEducationExist = await educationModel.findById(req.params.id)
            if(!isEducationExist) {
                next({
                    statusCode: 400,
                    message: "There is no education available with this information.",
                });
                return;
            }

            // deleting education
            await isEducationExist.deleteOne()

            // sending response
            res.status(200).json({message: {success: "Education has been deleted successfully"}})

        } catch (error) {
            next({
                statusCode: 500,
                message: "Getting internal server error while creating education...",
              });
        }
    }


