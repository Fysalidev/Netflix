import {PrismaClient} from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const client = global.prismadb || new PrismaClient();
if(process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;