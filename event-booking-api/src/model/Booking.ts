import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  statusOfBooking: {
    type: String,
    required: true,
  },
});

const Booking = model("Booking", bookingSchema);
export default Booking;
