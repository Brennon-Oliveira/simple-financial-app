import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const password = await bcrypt.hash("Senha123!", 10);

  const user = await prisma.user.upsert({
    where: { email: "brennonoliveira20014@gmail.com" },
    update: {
      password,
    },
    create: {
      email: "brennonoliveira20014@gmail.com",
      username: "brennon.oliveira",
      name: "Brennon Gabriel de Oliveira",
      password,
    },
  });

  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
