import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.SEED_CABINET_ADMIN_EMAIL ?? "admin@talentisconsult.com";
  const password = process.env.SEED_CABINET_ADMIN_PASSWORD ?? "TalentisAdmin2026!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Cabinet admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name: "Admin Talentis Consult",
      passwordHash,
      role: "CABINET",
      cabinetProfile: { create: { isAdmin: true, title: "Administrateur" } },
    },
  });

  console.log(`Cabinet admin created: ${email} / ${password}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
