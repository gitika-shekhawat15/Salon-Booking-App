import express from "express";

import { loginAdmin } from "../controllers/authController.js";
import { loginValidation } from "../validations/authValidation.js";
import { validate } from "../middleware/errorMiddleware.js";
const router = express.Router();

router.post(
  "/login",
  loginValidation,
  validate,
  loginAdmin
);
export default router;