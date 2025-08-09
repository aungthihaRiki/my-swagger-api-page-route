import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest } from "next";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyToken(
  request: NextApiRequest
): (JwtPayload & { sub: string }) | null {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded.sub) {
      return null;
    }

    return decoded as JwtPayload & { sub: string };
  } catch (error) {
    return null;
  }
}
