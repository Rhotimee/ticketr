import { Subjects, Publisher, PaymentCreatedEvent } from "@bamita/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
