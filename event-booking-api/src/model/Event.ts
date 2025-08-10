import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: String,
  capacity: String,
  price: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: Date,
});

const Event = model("Event", eventSchema);
export default Event;
