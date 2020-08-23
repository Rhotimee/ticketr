import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the provided is does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signup())
    .send({
      title: "ajdasdj",
      price: 30,
    })
    .expect(404);
});
it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "ajdasdj",
      price: 30,
    })
    .expect(401);
});
it("returns a 401 if the user does not own a ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "asdfg",
      price: 79,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signup())
    .send({
      title: "asjnsfjlsf osdfg",
      price: 1009,
    })
    .expect(401);
});
it("returns a 400 if user provides an invalid title or price", async () => {
  const cookie = global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdfg",
      price: 79,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 90,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "jonds",
      price: -100,
    })
    .expect(400);
});
it("updates the ticket provided valid input", async () => {
  const cookie = global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdfg",
      price: 79,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "kjslnsdmklsd",
      price: 90,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("kjslnsdmklsd");
  expect(ticketResponse.body.price).toEqual(90);
});
