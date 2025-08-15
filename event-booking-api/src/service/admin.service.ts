import mongoose, { SchemaTypes } from "mongoose";
import Event from "../model/Event";
import { EventType, EventUpdateType } from "../types/EventType";

class AdminService {
  async createEvent(eventData: EventType) {
    try {
      const createdAt = new Date();
      console.log(eventData.capacity)
      console.log(parseInt(eventData.capacity))
      // if (Number(eventData.capacity) < 1)
      //   return "Event Capacity is incorrect !!!"; //Handle negetive booking case
      // if (new Date().getTime() > new Date(eventData.date).getTime())
      //   return "Please enter the future date !!!"; //Handle the future date case
      // const createdBy = new mongoose.Types.ObjectId(eventData.createdBy);
      // const event = await Event.create({
      //   ...eventData,
      //   capacity: Number(eventData.capacity),
      //   createdAt,
      //   createdBy,
      // });
      // await event.save();
      return "Event created successfully!";
    } catch (error) {
      console.error("Error occurred in the createEvent Service: ", error);
      throw new Error("Internal Server Error !!!");
    }
  }
  async updateEvent(eventId: string, dataToUpdate: EventUpdateType) {
    try {
      const updatedAt = new Date();
      await Event.findByIdAndUpdate(eventId, { ...dataToUpdate, updatedAt });
      return "Event Updated Sucessfully !!!";
    } catch (error) {
      console.error("Error occurred in the updateEvent Service: ", error);
      throw new Error("Internal Server Error !!!");
    }
  }

  async deleteEvent(eventId: string) {
    try {
      await Event.findByIdAndDelete(eventId);
      return "Event deleted successfully!";
    } catch (error) {
      console.error("Error occurred in the deleteEvent Service: ", error);
      throw new Error("Internal Server Error !!!");
    }
  }
}

export default AdminService;
