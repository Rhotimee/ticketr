import { NotFoundError } from "./../../../common/src/errors/not-found-error";
import express, { Request, Response } from "express";
import { requireAuth, NotAuthorizedError } from "@bamita/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate("ticket");

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser?.id) {
    throw new NotAuthorizedError();
  }

  res.send(order);
});

export { router as showOrderRouter };
