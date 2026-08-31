import { requireRole } from "@/lib/rbac";
import { listClientTeam } from "@/server/actions/clientInvites";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ClientInviteForm } from "@/components/client/ClientInviteForm";
import { ClientInviteLink } from "@/components/client/ClientInviteLink";

export default async function ClientTeamPage() {
  await requireRole("CLIENT");
  const { members, invites } = await listClientTeam();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Mon équipe</h1>
      <p className="text-ink-500 mt-2 mb-8">
        Invitez des collègues à rejoindre votre entreprise sur Talentis Connect — ils partageront l&apos;accès à vos mandats et offres publiées.
      </p>

      <Card className="p-6 mb-8">
        <ClientInviteForm />
      </Card>

      <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Membres actuels</div>
      <div className="flex flex-col gap-2 mb-8">
        {members.map((m) => (
          <Card key={m.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ink-900">{m.user.name}</div>
              <div className="text-xs text-ink-500 mt-0.5">{m.user.email}{m.jobTitle ? ` · ${m.jobTitle}` : ""}</div>
            </div>
          </Card>
        ))}
      </div>

      {invites.length > 0 && (
        <>
          <div className="font-heading font-extrabold text-base text-ink-900 mb-3">Invitations</div>
          <div className="flex flex-col gap-2">
            {invites.map((invite) => {
              const status = invite.acceptedAt
                ? { label: "Acceptée", tone: "success" as const }
                : invite.expiresAt < new Date()
                  ? { label: "Expirée", tone: "danger" as const }
                  : { label: "En attente", tone: "warning" as const };

              return (
                <Card key={invite.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-ink-900">{invite.email}</div>
                    <div className="text-xs text-ink-500 mt-1">Invité par {invite.invitedBy.name}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    {!invite.acceptedAt && invite.expiresAt >= new Date() && (
                      <ClientInviteLink token={invite.token} />
                    )}
                    <Tag tone={status.tone}>{status.label}</Tag>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
