import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { OrderStatus } from "@bamita/common";

it("returns 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signup())
    .send({
      token: "asaljdskj",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns 401 when purchasing an order that does not belong to user", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    price: 400,
    status: OrderStatus.Created,
    version: 0,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signup())
    .send({
      token: "asaljdskj",
      orderId: order.id,
    })
    .expect(401);
});

it("returns 400 when purchasing a cancelled order", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    price: 400,
    status: OrderStatus.Cancelled,
    version: 0,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signup(userId))
    .send({
      token: "asaljdskj",
      orderId: order.id,
    })
    .expect(400);
});
