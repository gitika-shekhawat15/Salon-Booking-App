import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      service,
      date,
      time,
      notes,
    } = req.body;

    // 3. Check whether service exists and is active
    const selectedService = await Service.findOne({
      _id: service,
      isActive: true,
    });

    if (!selectedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found or unavailable",
      });
    }

    // 4. Check booking conflict
    const existingBooking = await Booking.findOne({
      date: new Date(date),
      time,
      status: { $ne: "Cancelled" },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    // 5. Create booking
    const booking = await Booking.create({
      customerName,
      phone,
      email,
      service,
      date: new Date(date),
      time,
      notes,
    });

    // 6. Return created booking
    const populatedBooking = await booking.populate(
      "service",
      "name price duration"
    );

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    // Database unique constraint conflict
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    console.error("Create booking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("service", "name price duration")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "service",
      "name price duration"
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = status;

    await booking.save();

    const updatedBooking = await booking.populate(
      "service",
      "name price duration"
    );

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Update booking status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
};