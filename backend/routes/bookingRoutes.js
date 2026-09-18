import express from "express";

import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,

} from "../controllers/bookingController.js";

import { createBookingValidation,bookingIdValidation, } from "../validations/bookingValidation.js";
import { validate } from "../middleware/errorMiddleware.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  createBookingValidation,
  validate,
  createBooking
);

router.get("/", protect,adminOnly, getAllBookings);

router.get("/:id", protect,adminOnly,
  bookingIdValidation,
  validate,
 getBookingById);

 router.patch(
  "/:id/status",
  protect,
  adminOnly,
  bookingIdValidation,
  validate,

  updateBookingStatus
);

export default router;