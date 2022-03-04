import express, { Request, Response } from "express";

const router = express.Router();

router.get("/healthcheck", (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "OK",
    date: new Date(),
  };

  res.status(200).send(data);
});

export { router as healthCheckRouter };
