import { prisma } from "@/lib/prisma";

export const getUserByPhone = async (phone: string) => {
    const user = await prisma.user.findUnique({ where: { phone } });
    return user;
}