import { cors } from "@/lib/cors";
import { initMiddleware } from "@/lib/init-middleware";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "@prisma/client";
import { verifyToken } from "../middleware/verifyToken";

const runCors = initMiddleware(cors);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  switch (req.method) {
    case "GET":
      return getByIdContacts(req, res);
    case "DELETE":
      return deleteContacts(req, res);
    case "PUT":
      return updateContacts(req, res);
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getByIdContacts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    console.log("Searching for:", id);
    const contact = await prisma.contact.findUnique({
      where: { id: id as string },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function deleteContacts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const decodedToken = verifyToken(req);

  if (!decodedToken) return res.status(401).json({ message: "Unauthorized" }); // check authentication
  if (decodedToken.role !== UserRole.ADMIN)
    return res.status(403).json({ message: "Forbidden" }); // check user role
  const { id } = req.query;
  try {
    console.log("Delete for:", id);
    const contact = await prisma.contact.delete({
      where: { id: id as string },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function updateContacts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const decodedToken = verifyToken(req);

  if (!decodedToken) return res.status(401).json({ message: "Unauthorized" }); // check authentication
  if (decodedToken.role !== UserRole.ADMIN)
    return res.status(403).json({ message: "Forbidden" }); // check user role
  const { id } = req.query;
  try {
    const { firstName, lastName, phone, email } = req.body;
    const contact = await prisma.contact.update({
      where: { id: id as string },
      data: { firstName, lastName, phone, email },
    });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
