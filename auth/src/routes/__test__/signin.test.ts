import request from "supertest";
import { app } from "../../app";

it("fails when a email that doesn't exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@kj.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "passwordkb",
    })
    .expect(400);
});

it("respond with a cookie when given valid credentials", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "rotimi@test.com",
      password: "password1",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "rotimi@test.com",
      password: "password1",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
