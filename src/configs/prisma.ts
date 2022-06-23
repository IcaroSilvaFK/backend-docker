import { PrismaClient } from '@prisma/client';

const api = new PrismaClient();

async function main() {
  await api.$connect();
}

main();

export { api };
