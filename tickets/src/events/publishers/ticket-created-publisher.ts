import { Publisher, Subjects, TicketCreatedEvent } from "@bamita/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
