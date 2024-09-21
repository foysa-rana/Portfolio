import { NextFunction, Request, Response } from "express";
import signupSchema from "../schemas/signupSchema";
import bcryptjs from "bcryptjs";
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import signinSchema from "../schemas/signinSchema";
import { sendVerificationEmail, sendResetEmail } from "../helpers/sendEmail";
import { verificationCodeSchema } from "../schemas/verificationCodeSchema";
import mongoose from "mongoose";
import emailSchema from "../schemas/emailSchema";
import passwordSchema from "../schemas/passwordSchema";

// signup
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request data
    const validatedFields = signupSchema.safeParse(req.body);
    if (!validatedFields.success) {
      const err = validatedFields.error.issues.reduce((acc, curr) => {
        const { path, message } = curr;
        return { ...acc, [path[0]]: message };
      }, {});
      next({ statusCode: 400, message: err });
      return;
    }
    const { name, email, password } = validatedFields.data;

    // verification code generator
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // checking if user already exist
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      // checking if user is verified
      if (isEmailExist.isVerified) {
        next({ statusCode: 400, message: "Email already in use" });
        return;
      } else {
        isEmailExist.verificationCode = verificationCode;
        isEmailExist.verificationCodeExpire = new Date(Date.now() + 600000);
        await isEmailExist.save();

        // // sending verification email
        // const verificationEmail = await sendVerificationEmail(
        //   name,
        //   email,
        //   verificationCode
        // );
        // // checking if verification email is sent
        // if (!verificationEmail.success) {
        //   next({
        //     statusCode: 500,
        //     message: verificationEmail.message,
        //   });
        //   return;
        // }
        // sending response
        res.status(200).json({
          message: {
            success:
              "Signup Successful. Please verify your account. Redirecting...",
          },
          user: { userId: isEmailExist._id },
        });
      }
    } else {
      // hash password
      const hashPassword = await bcryptjs.hash(password, 10);

      // creating new user
      const user = await userModel.create({
        name,
        email,
        password: hashPassword,
        verificationCode,
        verificationCodeExpire: new Date(Date.now() + 600000),
      });

      // // sending verification email
      // const verificationEmail = await sendVerificationEmail(
      //   name,
      //   email,
      //   verificationCode
      // );
      // // checking if verification email is sent
      // if (!verificationEmail.success) {
      //   next({
      //     statusCode: 500,
      //     message: verificationEmail.message,
      //   });
      //   return;
      // }
      // sending response
      res.status(200).json({
        message: {
          success:
            "Signup Successful. Please verify your account. Redirecting...",
        },
        user: { userId: user._id },
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Getting internal server error while signing up user...",
    });
  }
};

// verify user
export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request data
    const validatedFields = verificationCodeSchema.safeParse(req.body);
    if (!validatedFields.success) {
      const err = validatedFields.error.issues.reduce((acc, curr) => {
        const { path, message } = curr;
        return { ...acc, [path[0]]: message };
      }, {});
      next({ statusCode: 400, message: err });
      return;
    }
    const { userId, verificationCode } = validatedFields.data;

    // checking if valid id
    const validId = mongoose.Types.ObjectId.isValid(userId);
    if (!validId) {
      next({
        statusCode: 400,
        message: "User info is not valid please sign up again...",
      });
      return;
    }

    // checking if user exist
    const isUserExist = await userModel.findById({
      _id: userId,
    });
    if (!isUserExist) {
      next({ statusCode: 400, message: "User not found please signup first" });
      return;
    }

    // checking if user is already verified
    if (isUserExist.isVerified) {
      const token = jwt.sign(
        { _id: isUserExist._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      // setting cookies
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // sending response
      res.status(200).json({
        message: {
          verificationSuccess: "User has aready been verified redirecting...",
        },
        user: { name: isUserExist.name, email: isUserExist.email },
      });
      return;
    }

    // checing if verification code is correct
    if (verificationCode !== isUserExist.verificationCode) {
      next({ statusCode: 400, message: "Wronng verification code" });
      return;
    }

    // checking if verification code expired
    if (new Date(Date.now()) > new Date(isUserExist.verificationCodeExpire)) {
      next({
        statusCode: 400,
        message: "Verification code has expired please send again...",
      });
      return;
    }

    isUserExist.isVerified = true;
    await isUserExist.save();

    const token = jwt.sign({ _id: isUserExist._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // setting cookies
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // sending response
    res.status(200).json({
      message: { verificationSuccess: "User has been verified redirecting..." },
      user: { name: isUserExist.name, email: isUserExist.email },
    });
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "Getting internal server error while verifying user...",
    });
  }
};

// resend verification code
export const resend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // checking if user exist
    const isUserExist = await userModel.findById({ _id: req.body.userId });
    if (!isUserExist) {
      next({ statusCode: 400, message: "User not found please signup first" });
      return;
    }

    // limiting resnding verification code
    if (new Date(isUserExist.resendVerificationCode) > new Date(Date.now())) {
      const seconds = new Date(
        Number(isUserExist.resendVerificationCode) -
          Number(new Date(Date.now()))
      ).getSeconds();
      res.status(400).json({
        seconds,
        message: `Wait ${seconds} to resend verification email...`,
      });
      return;
    }
    // verification code generator
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    isUserExist.verificationCode = verificationCode;
    isUserExist.verificationCodeExpire = new Date(Date.now() + 600000);
    isUserExist.resendVerificationCode = new Date(Date.now() + 60000);
    await isUserExist.save();

    // sending verification email
    // const verificationEmail = await sendVerificationEmail(
    //   isUserExist.name,
    //   isUserExist.email,
    //   verificationCode
    // );
    // // checking if verification email is sent
    // if (!verificationEmail.success) {
    //   next({
    //     statusCode: 500,
    //     message: verificationEmail.message,
    //   });
    //   return;
    // }
    // sending response
    res.status(200).json({
      seconds: new Date(
        Number(isUserExist.resendVerificationCode) -
          Number(new Date(Date.now()))
      ).getSeconds(),
      message: {
        success: "Verification email has been sent",
      },
    });
  } catch (error) {
    next({
      statusCode: 500,
      message:
        "Getting internal server error while resending verification email...",
    });
  }
};

// signin
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validating input fields
    const validatedFields = signinSchema.safeParse(req.body);
    if (!validatedFields.success) {
      const err = validatedFields.error.issues.reduce((acc, curr) => {
        const { path, message } = curr;
        return { ...acc, [path[0]]: message };
      }, {});
      next({ statusCode: 400, message: err });
      return;
    }
    const { email, password } = validatedFields.data;

    // checking if user exist
    const isUserExist = await userModel.findOne({ email });
    if (!isUserExist) {
      next({ statusCode: 401, message: "Credeintial does not matched..." });
      return;
    }

    if (!isUserExist.isVerified) {
      // verification code generator
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      isUserExist.verificationCode = verificationCode;
      isUserExist.verificationCodeExpire = new Date(Date.now() + 600000);
      await isUserExist.save();

      // // sending verification email
      // const verificationEmail = await sendVerificationEmail(
      //   name,
      //   email,
      //   verificationCode
      // );
      // // checking if verification email is sent
      // if (!verificationEmail.success) {
      //   next({
      //     statusCode: 500,
      //     message: verificationEmail.message,
      //   });
      //   return;
      // }
      // sending response
      res.status(200).json({
        message: {
          unverifiedUser:
            "User has not verified yet. Please verify your account. Redirecting...",
        },
        user: { userId: isUserExist._id },
      });
      return;
    }

    // checking if password matched
    const isPasswordMatched = await bcryptjs.compare(
      password,
      isUserExist?.password as string
    );
    if (!isPasswordMatched) {
      next({ statusCode: 401, message: "Credeintial does not matched..." });
      return;
    }

    const token = jwt.sign({ _id: isUserExist._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    // remove this line
    console.log(token)
    // setting cookies
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // sending response
    res.status(200).json({
      message: { success: "Signin Successfull" },
      user: { name: isUserExist.name, email: isUserExist.email },
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Getting internal server while signing in user...",
    });
  }
};

// sending password reset email
export const resetPasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("called");
  try {
    // validating input fields
    const validatedFields = emailSchema.safeParse(req.body.email);
    if (!validatedFields.success) {
      const err = validatedFields.error.issues.reduce((acc: any, curr: any) => {
        const { validation, message } = curr;
        return { ...acc, [validation]: message };
      }, {});
      next({ statusCode: 400, message: err });
      return;
    }

    // checking if user exist
    const isUserExist = await userModel.findOne({
      email: validatedFields.data,
    });
    if (!isUserExist) {
      res.status(200).json({
        message: {
          success: "Email has been sent. Please check your inbox...",
        },
      });
      return;
    }

    if (!isUserExist.isVerified) {
      // verification code generator
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      isUserExist.verificationCode = verificationCode;
      isUserExist.verificationCodeExpire = new Date(Date.now() + 600000);
      await isUserExist.save();

      // // sending verification email
      // const verificationEmail = await sendVerificationEmail(
      //   name,
      //   email,
      //   verificationCode
      // );
      // // checking if verification email is sent
      // if (!verificationEmail.success) {
      //   next({
      //     statusCode: 500,
      //     message: verificationEmail.message,
      //   });
      //   return;
      // }
      // sending response
      res.status(200).json({
        message: {
          unverifiedUser:
            "User has not verified yet. Please verify your account. Redirecting...",
        },
        user: { userId: isUserExist._id },
      });
      return;
    }

    // verification code generator
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    isUserExist.verificationCode = verificationCode;
    isUserExist.verificationCodeExpire = new Date(Date.now() + 600000);
    await isUserExist.save();

    // reset link generator
    const link = `${req.headers.host}/auth/reset/resetpassword?user=${isUserExist._id}&code=${verificationCode}`;

    // // sending verification email
    // const verificationEmail = await sendResetEmail(
    //   name,
    //   email,
    //   link
    // );
    // // checking if verification email is sent
    // if (!verificationEmail.success) {
    //   next({
    //     statusCode: 500,
    //     message: verificationEmail.message,
    //   });
    //   return;
    // }
    // sending response
    console.log(link);
    res.status(200).json({
      message: {
        success: "Email has been sent. Please check your inbox...",
      },
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Getting internal server while reseting password...",
    });
  }
};

// password reset
export const passowordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    // validating input fields
    const validatedFields = passwordSchema.safeParse(req.body.password);
    if (!validatedFields.success) {
      const err = validatedFields.error.issues.reduce((acc: any, curr: any) => {
        const { message } = curr;
        return { ...acc, password: message };
      }, {});
      next({ statusCode: 400, message: err });
      return;
    }
    // checking if valid id
    const validId = mongoose.Types.ObjectId.isValid(req.body.userId);
    if (!validId) {
      next({
        statusCode: 400,
        message: "The link has been expired.",
      });
      return;
    }
    const isUserExist = await userModel.findById(req.body.userId);
    if (
      isUserExist &&
      isUserExist.verificationCode === req.body.code &&
      new Date(Date.now()) < new Date(isUserExist.verificationCodeExpire)
    ) {
      const hashPassword = await bcryptjs.hash(req.body.password, 10);
      isUserExist.password = hashPassword;
      await isUserExist.save();
      const token = jwt.sign(
        { _id: isUserExist._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );
      // setting cookies
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      // sending response
      res.status(200).json({
        message: { resetSuccess: "Password reset Successfull. Redirecting..." },
        user: { name: isUserExist.name, email: isUserExist.email },
      });
    } else {
      next({
        statusCode: 400,
        message: "The link has been expired.",
      });
      return;
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Getting internal server while reseting password...",
    });
  }
};
