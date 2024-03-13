import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import generateOTP from "../services/otpGenerater";
import response from "../services/apiresponse";
import { errorHandler } from "../services/handleResponse";
require("dotenv").config();

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role, phoneNumber } =
      req.body;
    if (!firstName || !lastName || !email || !password) {
      response.useErrorResponse(
        res,
        "Registration failed. Please provide all required information.",
        true,
        400
      );

      return;
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      response.useErrorResponse(
        res,
        "Email already taken. Try another.",
        true,
        400
      );
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP(6);
    const newUser = new UserModel({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      verificationToken: otp,
      verificationTokenTime: Date.now(),
      role: role || "user",
    });

    await newUser.save();
    // Send OTP
    const data = {
      email: newUser.email,
      password: newUser.password,
      id: newUser._id,
    };
    response.useSuccessResponse(
      res,
      "Registration successful. Check your email for verification.",
      data,
      201
    );
    return;
  } catch (error) {
    console.error(error);
    errorHandler(res, error);
  }
};

export { register };
