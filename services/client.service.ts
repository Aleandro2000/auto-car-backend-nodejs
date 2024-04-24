import { type FastifyReply, type FastifyRequest } from "fastify";
import clientModel from "../models/client.model";

export default {
  create: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { firstname, lastname, email, phone_number, cars_details } =
        request.body as any;
      const client = new clientModel({
        firstname,
        lastname,
        email,
        phone_number,
        cars_details,
      });
      await client.save();
      reply.send({
        status: 200,
        message: "Client created successfully!",
        result: client,
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
      const client = await clientModel.findOne({ clientId: parseInt(id) });
      reply.send({
        status: 200,
        message: "Client detais read successfully!",
        result: client,
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
      const { id } = request.params as any;
      const { firstname, lastname, email, phone_number, cars_details } =
        request.body as any;
      const client = await clientModel.findOneAndUpdate(
        { clientId: parseInt(id) },
        {
          firstname,
          lastname,
          email,
          phone_number,
          cars_details,
        }
      );
      reply.send({
        status: 200,
        message: "Client updated successfully!",
        result: client,
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
      const client = await clientModel.deleteOne({
        clientId: parseInt(id),
      });
      reply.send({
        status: 200,
        message: "Client deleted successfully!",
        result: client,
      });
    } catch (err) {
      reply.send({
        status: 500,
        message: err.message,
      });
    }
  },
};
