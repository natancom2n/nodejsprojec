import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

//when import {} is not necessary, bcause to export default
export default prismaClient;