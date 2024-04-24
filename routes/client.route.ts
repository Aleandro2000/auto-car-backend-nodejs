import { type FastifyInstance } from "fastify";
import clientService from "../services/client.service";

export default function (
  fastify: FastifyInstance,
  opts: any,
  done: () => void
) {
  fastify.post("/create", opts, clientService.create);
  fastify.get("/read/:id", opts, clientService.read);
  fastify.put("/update", opts, clientService.update);
  fastify.delete("/delete/:id", opts, clientService.delete);
  done();
}
