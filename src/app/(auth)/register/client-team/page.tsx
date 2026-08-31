import { prisma } from "@/lib/prisma";
import { ClientTeamRegisterForm } from "@/components/auth/ClientTeamRegisterForm";
import { Logo } from "@/components/layout/Logo";

export default async function ClientTeamRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <InvalidInvite message="Lien d'invitation manquant." />;
  }

  const invite = await prisma.clientInvite.findUnique({
    where: { token },
    include: { company: { select: { name: true } } },
  });

  if (!invite) return <InvalidInvite message="Invitation introuvable." />;
  if (invite.acceptedAt) return <InvalidInvite message="Cette invitation a déjà été utilisée." />;
  if (invite.expiresAt < new Date()) return <InvalidInvite message="Cette invitation a expiré." />;

  return (
    <div className="max-w-[440px] mx-auto px-8 py-14">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>
      <ClientTeamRegisterForm token={token} email={invite.email} companyName={invite.company.name} />
    </div>
  );
}

function InvalidInvite({ message }: { message: string }) {
  return (
    <div className="max-w-[440px] mx-auto px-8 py-14 text-center">
      <p className="text-ink-700">{message}</p>
    </div>
  );
}
