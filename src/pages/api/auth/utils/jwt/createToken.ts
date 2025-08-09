import { UserRole } from '@prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; // Store securely in .env
const JWT_EXPIRES_IN = '10m'; // Customize as needed

export function createJwtToken( id: string, email: string, role?: UserRole ) {
  return jwt.sign(
    {
      sub: id,
      email: email,
      role: role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}
