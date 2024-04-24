import { type FastifyInstance } from "fastify";
import historyService from "../services/history.service";

export default function (
  fastify: FastifyInstance,
  opts: any,
  done: () => void
) {
  fastify.post("/create", opts, historyService.create);
  fastify.get("/read/:id", opts, historyService.read);
  fastify.put("/update", opts, historyService.update);
  fastify.delete("/delete/:id", opts, historyService.delete);
  done();
}
