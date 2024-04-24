import { type FastifyInstance } from "fastify";
import scheduleService from "../services/schedule.service";

export default function (
  fastify: FastifyInstance,
  opts: any,
  done: () => void
) {
  fastify.post("/create", opts, scheduleService.create);
  fastify.get("/read/:id", opts, scheduleService.read);
  fastify.put("/update", opts, scheduleService.update);
  fastify.delete("/delete/:id", opts, scheduleService.delete);
  done();
}
