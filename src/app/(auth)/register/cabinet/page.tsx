import { prisma } from "@/lib/prisma";
import { CabinetRegisterForm } from "@/components/auth/CabinetRegisterForm";

export default async function CabinetRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <InvalidInvite message="Lien d'invitation manquant." />;
  }

  const invite = await prisma.cabinetInvite.findUnique({ where: { token } });

  if (!invite) {
    return <InvalidInvite message="Invitation introuvable." />;
  }
  if (invite.acceptedAt) {
    return <InvalidInvite message="Cette invitation a déjà été utilisée." />;
  }
  if (invite.expiresAt < new Date()) {
    return <InvalidInvite message="Cette invitation a expiré." />;
  }

  return (
    <div className="max-w-[440px] mx-auto px-8 py-14">
      <CabinetRegisterForm token={token} email={invite.email} />
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
