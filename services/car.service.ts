import { type FastifyReply, type FastifyRequest } from "fastify";
import carModel from "../models/car.model";

export default {
  create: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { registration_number, chassis_series, client_id } =
        request.body as any;
      const car = new carModel({
        registration_number,
        chassis_series,
        client_id,
      });
      await car.save();
      reply.send({
        status: 200,
        message: "Car created successfully!",
        result: car,
      });
    } catch (err) {
      reply.send({
        status: 500,
        message: err.message,
      });
    }
  },
  read: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const car = await carModel.findOne({ clientId: parseInt(id) });
      reply.send({
        status: 200,
        message: "Car detais read successfully!",
        result: car,
      });
    } catch (err) {
      reply.send({
        status: 500,
        message: err.message,
      });
    }
  },
  update: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { registration_number, chassis_series, client_id } =
        request.body as any;
      const { id } = request.params as any;
      const car = await carModel.findOneAndUpdate(
        { clientId: parseInt(id) },
        {
          registration_number,
          chassis_series,
          client_id,
        }
      );
      reply.send({
        status: 200,
        message: "Car updated successfully!",
        result: car,
      });
    } catch (err) {
      reply.send({
        status: 500,
        message: err.message,
      });
    }
  },
  delete: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const car = await carModel.deleteOne({
        clientId: parseInt(id),
      });
      reply.send({
        status: 200,
        message: "Client deleted successfully!",
        result: car,
      });
    } catch (err) {
      reply.send({
        status: 500,
        message: err.message,
      });
    }
  },
};
