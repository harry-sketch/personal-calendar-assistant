import cors from "cors";
import express from "express";

export const createExpressServer = () => {
  const app = express();

  app.use(cors(), express.json());

  return app;
};
