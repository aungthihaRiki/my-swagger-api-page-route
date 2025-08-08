// import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  const contacts = await prisma.contact.findMany();
  return res.status(200).json(contacts);
}

export async function postContact(req: NextApiRequest, res: NextApiResponse) {
  // res.status(201).json({ message: "Contact created" });
  try {
    const { firstName, lastName, phone, email } = req.body;
    console.log(" contact body", req.body );
    console.log({ firstName, lastName, phone, email });

    if (!firstName || !lastName || !phone || !email) {
      return res.status(400).json(
        { error: "Missing required fields" }
      );
    }

    const contact = await prisma.contact.create({
      data: { firstName, lastName, phone, email },
    });
    console.log(contact)
    if (!contact) {
      return res.status(404).json(
        { error: "Contact Failed to be created" }
      );
    }

    return res.status(201).json(contact);
  } catch (err: any) {
    return res.status(500).json(
      { error: "Server error", details: err.message }
    );
  }
}
