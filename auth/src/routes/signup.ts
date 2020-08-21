import express, { Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@bamita/common";
import jwt from "jsonwebtoken";
import { authValidation } from "../middlewares/user-input-validation";

const router = express.Router();

router.post(
  "/api/users/signup",
  authValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in Use");
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    // Generate JWT
    const userJwt = await jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    // Store it on session object

    res.status(201).send(user);
  }
);

export { router as signupRouter };
