import { type FastifyReply, type FastifyRequest } from "fastify";
import historyModel from "../models/history.model";

export default {
  create: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { car_details, car_processing, schedule_id } = request.body as any;
      const history = new historyModel({
        car_details,
        car_processing,
        schedule_id,
      });
      await history.save();
      reply.send({
        status: 200,
        message: "History created successfully!",
        result: history,
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
      const history = await historyModel.findOne({ historyId: parseInt(id) });
      reply.send({
        status: 200,
        message: "History detais read successfully!",
        result: history,
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
      const { car_details, car_processing, schedule_id } = request.body as any;
      const { id } = request.params as any;
      const history = await historyModel.findOneAndUpdate(
        { historyId: parseInt(id) },
        {
          car_details,
          car_processing,
          schedule_id,
        }
      );
      reply.send({
        status: 200,
        message: "History updated successfully!",
        result: history,
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
      const history = await historyModel.deleteOne({
        historyId: parseInt(id),
      });
      reply.send({
        status: 200,
        message: "History deleted successfully!",
        result: history,
      });
    } catch (err) {
      reply.send({
        status: 500,
        message: err.message,
      });
    }
  },
};
