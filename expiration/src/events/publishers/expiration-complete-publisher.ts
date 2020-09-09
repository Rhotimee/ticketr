import { Subjects, Publisher, ExpirationCompleteEvent } from "@bamita/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
