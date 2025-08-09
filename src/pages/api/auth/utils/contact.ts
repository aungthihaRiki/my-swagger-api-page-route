import { prisma } from "@/lib/prisma";

export const getContactById = async (id: string) => {
    const contact = await prisma.contact.findUnique({ where: { id } });
    return contact;
}

export const getContactByPhone = async (phone: string) => {
    const contact = await prisma.contact.findUnique({ where: { phone } });
    return contact;
}

export const getContactByEmail = async (email: string) => {
    const contact = await prisma.contact.findUnique({ where: { email } });
    return contact;
}