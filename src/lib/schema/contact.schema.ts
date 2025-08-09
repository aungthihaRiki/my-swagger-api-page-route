import z from "zod";

export const ContactSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
});

export type ContactInput = z.infer<typeof ContactSchema>;