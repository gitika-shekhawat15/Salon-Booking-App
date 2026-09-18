import { body, param } from "express-validator";

export const bookingIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid booking ID"),
];

export const createBookingValidation = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Customer name must be between 2 and 50 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please enter a valid Indian phone number"),

  body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .bail()
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  body("service")
    .trim()
    .notEmpty()
    .withMessage("Service is required")
    .isMongoId()
    .withMessage("Invalid service ID"),

    body("date")
  .trim()
  .notEmpty()
  .withMessage("Date is required")
  .matches(/^\d{4}-\d{2}-\d{2}$/)
  .withMessage("Date must be in YYYY-MM-DD format")
  .custom((value) => {
    const selectedDate = new Date(`${value}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      throw new Error("Appointment date cannot be in the past");
    }

    return true;
  }),

  body("time")
    .trim()
    .notEmpty()
    .withMessage("Time is required")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("Time must be in HH:MM format"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];