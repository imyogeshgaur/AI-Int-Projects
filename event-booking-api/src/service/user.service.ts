import { decodeUser } from "../helper/decodeUser";
import Booking from "../model/Booking";
import Event from "../model/Event";

class UserService {
  async getAllEvents() {
    try {
      const allEvents = await Event.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
          },
        },
      ]);
      return allEvents;
    } catch (error) {
      console.log("Error occurred at getting all events service : ", error);
    }
  }
  async getSingleEvent(eventId: string) {
    try {
      const event = await Event.findById(eventId);
      return event;
    } catch (error) {
      console.log("Error in feching single bookings service : ", error);
    }
  }
  async getAllBookings(token: string) {
    try {
      const emailOfUser = await decodeUser(token);
      const allBookings = await Booking.find({ emailOfUser });
      return allBookings;
    } catch (error) {
      console.log("Error occurred in get all bookings : ", error);
    }
  }
  async bookTheEvent(userId: string, eventId: string) {
    try {
      const newBooking = await Booking.create({
        userId,
        eventId,
        statusOfBooking: "Booked",
        bookingDate: new Date(),
      });
      await newBooking.save();
      return "Event Booked Sucessfully !!!";
    } catch (error) {
      console.log("Error occurred in booking event !!!");
    }
  }
  async deleteBooking(bookingId: string) {
    try {
      const canceledBooking = await Booking.findByIdAndDelete(bookingId);
      if (canceledBooking) {
        //Handled the freeing up of seats assuming one person is booking in one booking id
        const eventOfDeletedBooking: any = await Event.findById(
          canceledBooking.eventId
        );
        await Event.findByIdAndUpdate(canceledBooking.eventId, {
          capacity: eventOfDeletedBooking?.capacity + 1,
        });
      } else {
        return "Booking is not cancelled !!!";
      }
    } catch (error) {
      console.log("Error in deleting booking id : ", error);
    }
  }
}

export default UserService;
