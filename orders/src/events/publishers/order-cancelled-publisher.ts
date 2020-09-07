import { Publisher, OrderCancelledEvent, Subjects } from "@bamita/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
