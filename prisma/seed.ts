import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seedCabinetAdmin() {
  const email = process.env.SEED_CABINET_ADMIN_EMAIL ?? "admin@talentisconsult.com";
  const password = process.env.SEED_CABINET_ADMIN_PASSWORD ?? "TalentisAdmin2026!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Cabinet admin already exists: ${email}`);
    return existing;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: {
      email,
      name: "Admin Talentis Consult",
      passwordHash,
      role: "CABINET",
      cabinetProfile: { create: { isAdmin: true, title: "Administrateur" } },
    },
  });

  console.log(`Cabinet admin created: ${email} / ${password}`);
  return admin;
}

const DEMO_JOBS = [
  {
    company: "Néosoft Maroc",
    city: "Casablanca",
    title: "Développeur Full-Stack React / Node.js",
    category: "Tech",
    contractType: "CDI",
    remoteType: "Télétravail partiel",
    salaryMin: 12000,
    salaryMax: 16000,
    description:
      "Néosoft Maroc accompagne ses clients grands comptes sur des projets web à fort trafic. Nous recherchons un développeur Full-Stack pour renforcer l'équipe produit basée à Casablanca.",
    missions: [
      "Développer des fonctionnalités front (React/TypeScript) et back (Node.js)",
      "Participer aux revues de code et à l'amélioration continue de l'architecture",
      "Collaborer avec les équipes design et produit",
    ],
    profile: [
      "3 ans d'expérience minimum en développement web",
      "Maîtrise de React, TypeScript et Node.js",
      "Bon niveau d'autonomie et de communication",
    ],
  },
  {
    company: "Talentis Consult",
    city: "Casablanca",
    title: "Chargé(e) de recrutement",
    category: "RH",
    contractType: "CDI",
    remoteType: "Sur site",
    salaryMin: 8000,
    salaryMax: 11000,
    description:
      "Talentis Consult recrute un(e) chargé(e) de recrutement pour accompagner ses clients dans leurs besoins, tous secteurs confondus, sur la région Casablanca-Settat.",
    missions: [
      "Sourcer et pré-qualifier des candidats sur des mandats variés",
      "Conduire les entretiens de pré-sélection",
      "Assurer le suivi de la relation client",
    ],
    profile: [
      "Expérience en recrutement, cabinet ou entreprise",
      "Excellent relationnel et sens du service",
      "Organisation et gestion des priorités",
    ],
  },
  {
    company: "Clinique Atlas",
    city: "Rabat",
    title: "Infirmier(ère) polyvalent(e)",
    category: "Santé",
    contractType: "CDI",
    remoteType: "Sur site",
    salaryMin: 6000,
    salaryMax: 8000,
    description:
      "La Clinique Atlas recherche un(e) infirmier(ère) polyvalent(e) pour renforcer son service de médecine générale à Rabat.",
    missions: [
      "Assurer les soins infirmiers auprès des patients hospitalisés",
      "Collaborer avec l'équipe médicale au suivi des dossiers",
      "Veiller au respect des protocoles d'hygiène et de sécurité",
    ],
    profile: ["Diplôme d'État infirmier requis", "Expérience en milieu hospitalier appréciée", "Sens de l'écoute"],
  },
  {
    company: "Bativia Construction",
    city: "Marrakech",
    title: "Chef de chantier BTP",
    category: "BTP",
    contractType: "CDI",
    remoteType: "Sur site",
    salaryMin: 9000,
    salaryMax: 12000,
    description:
      "Bativia Construction recrute un chef de chantier pour superviser des projets de construction résidentielle dans la région de Marrakech.",
    missions: [
      "Superviser les équipes sur le terrain et coordonner les sous-traitants",
      "Veiller au respect des délais, des coûts et de la sécurité",
      "Assurer le suivi qualité des travaux réalisés",
    ],
    profile: ["Expérience confirmée en conduite de chantier", "Connaissance des normes de sécurité BTP", "Permis B requis"],
  },
  {
    company: "Fidexa Conseil",
    city: "Casablanca",
    title: "Comptable général",
    category: "Finance",
    contractType: "CDD",
    remoteType: "Télétravail partiel",
    salaryMin: 7000,
    salaryMax: 9000,
    description:
      "Fidexa Conseil, cabinet d'expertise comptable, recherche un comptable général pour un remplacement de congé maternité de 6 mois.",
    missions: [
      "Tenir la comptabilité générale d'un portefeuille clients",
      "Préparer les déclarations fiscales et sociales",
      "Participer aux clôtures mensuelles",
    ],
    profile: ["Formation BTS/DCG comptabilité minimum", "2 ans d'expérience en cabinet ou en entreprise", "Fiabilité"],
  },
  {
    company: "Atlas Digital",
    city: "Casablanca",
    title: "Business Developer B2B",
    category: "Commerce",
    contractType: "CDI",
    remoteType: "Télétravail total",
    salaryMin: 8000,
    salaryMax: 13000,
    description:
      "Atlas Digital, agence marketing digital, recrute un(e) Business Developer pour accélérer son développement commercial auprès des PME marocaines.",
    missions: [
      "Prospecter et qualifier de nouveaux clients B2B",
      "Mener les rendez-vous de découverte et de closing",
      "Assurer le suivi du pipeline commercial",
    ],
    profile: ["Expérience en développement commercial B2B", "Aisance relationnelle et esprit de conquête", "Autonomie"],
  },
];

async function seedDemoJobs(postedByUserId: string) {
  for (const job of DEMO_JOBS) {
    const existingCompany = await prisma.company.findFirst({ where: { name: job.company } });
    const company =
      existingCompany ??
      (await prisma.company.create({ data: { name: job.company, city: job.city, sector: job.category } }));

    const existingJob = await prisma.jobPosting.findFirst({
      where: { companyId: company.id, title: job.title },
    });
    if (existingJob) continue;

    await prisma.jobPosting.create({
      data: {
        companyId: company.id,
        postedByUserId,
        title: job.title,
        description: job.description,
        missions: job.missions,
        profile: job.profile,
        city: job.city,
        contractType: job.contractType,
        category: job.category,
        remoteType: job.remoteType,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
    console.log(`Demo job created: ${job.title} @ ${job.company}`);
  }
}

async function main() {
  const admin = await seedCabinetAdmin();
  await seedDemoJobs(admin.id);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
