import Fastify from "fastify";
import process from "process";
import { config } from "dotenv";
import mongoose from "mongoose";
import clientRoute from "./routes/client.route";
import { error, log } from "console";
import carRoute from "./routes/car.route";
import historyRoute from "./routes/history.route";
import scheduleRoute from "./routes/schedule.route";
import cors from "@fastify/cors";

config();

mongoose
  .connect(process.env.DB_URL, {
    useBigInt64: true,
  })
  .then(() => {
    process.env.APP_MODE !== "production" &&
      log("Connected to MongoDB: %s \n ", process.env.DB_URL);
  })
  .catch((err: Error) => {
    error("MongoDB connection error: %s \n", err);
  });

const fastify = Fastify({
  logger: process.env.APP_MODE !== "production",
});

fastify.register(cors);

fastify.register(clientRoute, {
  prefix: "api/v1/client",
});
fastify.register(carRoute, {
  prefix: "api/v1/car",
});
fastify.register(historyRoute, {
  prefix: "api/v1/history",
});
fastify.register(scheduleRoute, {
  prefix: "api/v1/schedule",
});

fastify.listen(
  { port: parseInt(process.env.APP_PORT) || 8081 },
  (err: Error) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
