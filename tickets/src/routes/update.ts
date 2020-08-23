import express, { Request, Response } from "express";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@bamita/common";
import { Ticket } from "../models/tickets";
import { ticketValidator } from "./new";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  ticketValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const { title, price } = req.body;

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
