import { Publisher, Subjects, TicketUpdatedEvent } from "@bamita/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
