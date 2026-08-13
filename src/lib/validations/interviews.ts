import { z } from "zod";

export const submitAvailabilitySchema = z.object({
  interviewId: z.string().min(1),
  slots: z
    .array(
      z.object({
        startAt: z.string().min(1),
        endAt: z.string().min(1),
      }),
    )
    .min(1, "Proposez au moins un créneau"),
});

export const scheduleInterviewSchema = z.object({
  interviewId: z.string().min(1),
  slotId: z.string().min(1),
  mode: z.enum(["ONSITE", "VIDEO", "PHONE"]),
  meetingLink: z.string().trim().optional(),
});

export const submitFeedbackSchema = z.object({
  interviewId: z.string().min(1),
  outcome: z.enum(["VALIDATED", "RESERVED", "REFUSED"]),
  comment: z.string().trim().optional(),
});
