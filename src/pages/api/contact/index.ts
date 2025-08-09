import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { initMiddleware } from "@/lib/init-middleware";
import { cors } from "@/lib/cors";
import { verifyToken } from "../middleware/verifyToken";
import { UserRole } from "@prisma/client";
import { getContactByEmail, getContactByPhone } from "../auth/utils/contact";
import { validateRequest } from "../auth/utils/validateRequest";
import { ContactInput, ContactSchema } from "@/lib/schema/contact.schema";

const runCors = initMiddleware(cors);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  switch (req.method) {
    case "GET":
      return getContacts(req, res);
    case "POST":
      return postContact(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getContacts(req: NextApiRequest, res: NextApiResponse) {
  const decodedToken = verifyToken(req);
  console.log("decodedToken", decodedToken);

  if (!decodedToken) return res.status(401).json({ message: "Unauthorized" }); // check authentication

  try {
    const contacts = await prisma.contact.findMany();
    if (contacts.length === 0) {
      return res.status(404).json({ error: "Contacts not found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postContact(req: NextApiRequest, res: NextApiResponse) {
  const decodedToken = verifyToken(req);
  console.log("decodedToken", decodedToken);

  if (!decodedToken) return res.status(401).json({ message: "Unauthorized" }); // check authentication
  if (decodedToken.role !== UserRole.ADMIN)
    return res.status(403).json({ message: "Forbidden" }); // check user role

  try {
    const validation = validateRequest(ContactSchema, req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validation.errors,
      });
    }

    const contactData: ContactInput = validation.data;

    const existingUserByPhone = await getContactByPhone(contactData.phone);
    const existingUserByEmail = await getContactByEmail(contactData.email);
    if (existingUserByEmail || existingUserByPhone)
      return res.status(409).json({ message: "Contact already exists." });

    const newContact = await prisma.contact.create({
      data: {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        phone: contactData.phone,
        email: contactData.email,
      },
    });

    console.log("new Contact", newContact);
    if (!newContact) {
      return res.status(404).json({ error: "Contact Failed to be created" });
    }

    return res
      .status(201)
      .json({ message: "Contact created successfully", contact: newContact });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
}
