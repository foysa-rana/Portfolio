/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);
  const defaultErr = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error",
  };
  res.status(defaultErr.statusCode).json({ error: defaultErr.message });
};

export default errorHandlerMiddleware;
