import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHello(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getHello(req: NextApiRequest, res: NextApiResponse) {
  try {
    const count = await prisma.contact.count(); // just test connection
    return res.status(200).json({ message: `Database OK, count: ${count}` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
