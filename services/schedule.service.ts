import { type FastifyReply, type FastifyRequest } from "fastify";
import scheduleModel from "../models/schedule.model";

export default {
  create: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { car_id, date, duration } = request.body as any;
      const schedule = new scheduleModel({
        car_id,
        date,
        duration,
      });
      await schedule.save();
      reply.send({
        status: 200,
        message: "Schedule created successfully!",
        result: schedule,
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
      const schedule = await scheduleModel.findOne({ scheduleId: parseInt(id) });
      reply.send({
        status: 200,
        message: "Schedule detais read successfully!",
        result: schedule,
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
        const { car_id, date, duration } = request.body as any;
      const { id } = request.params as any;
      const schedule = await scheduleModel.findOneAndUpdate(
        { scheduleId: parseInt(id) },
        {
          car_id,
          date,
          duration,
        }
      );
      reply.send({
        status: 200,
        message: "Schedule updated successfully!",
        result: schedule,
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
      console.log(id)
      const schedule = await scheduleModel.deleteOne({
        scheduleId: parseInt(id),
      });
      reply.send({
        status: 200,
        message: "Schedule deleted successfully!",
        result: schedule,
      });
    } catch (err) {
      reply.send({
        status: 500,
        message: err.message,
      });
    }
  },
};
