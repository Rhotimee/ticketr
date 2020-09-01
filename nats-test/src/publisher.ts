import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketr", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({ id: "123", title: "content", price: 20 });
  } catch (error) {
    console.error(error);
  }
});
