import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;
  if (!token) {
    next({ statusCode: 401, message: "Authentication failed" });
    return;
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {userId: verify._id};
    next();
  } catch (error:any) {
    console.log(error.message)
    next({ statusCode: 401, message: "Authentication failed" });
  }
};

export default authMiddleware;
