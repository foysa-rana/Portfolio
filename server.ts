import next from "next";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute";
import connectDb from "./db/connectDb";
import errorHandlerMiddleware from "./middleware/errorHandler";
import authMiddleware from "./middleware/auth";
import educationRouter from "./routes/educationRoute";

const port = parseInt(process.env.PORT || "5000");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.get("/test", authMiddleware, (req: Request, res: Response) => {
    res.send("Working");
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/education", authMiddleware, educationRouter);
  app.get("*", (req: Request, res: Response) => {
    handle(req, res);
  });

  app.use(errorHandlerMiddleware);

  const server = async () => {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  };
  server();
});
