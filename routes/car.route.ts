import { type FastifyInstance } from "fastify";
import carService from "../services/car.service";

export default function (
  fastify: FastifyInstance,
  opts: any,
  done: () => void
) {
  fastify.post("/create", opts, carService.create);
  fastify.get("/read/:id", opts, carService.read);
  fastify.put("/update", opts, carService.update);
  fastify.delete("/delete/:id", opts, carService.delete);
  done();
}
